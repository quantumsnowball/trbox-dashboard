import { PORT_WS } from '@/common/constants';
import { contentTempActions } from '@/redux/slices/contentTemp';
import { RootState } from '@/redux/store';
import {
  createChart,
  ColorType,
  SeriesDataItemTypeMap,
  SeriesType,
  ISeriesApi,
} from 'lightweight-charts';
import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EquityValue, TaggedMessage, WebSocketMessage } from '../tradelog/types';


export const SAMPLE_DATA = [
  // { time: '2018-12-30', value: 22.68 },
  // { time: '2018-12-31', value: 22.67 },
];


export const SAMPLE_COLOR = {
  backgroundColor: 'white',
  lineColor: '#2962FF',
  textColor: 'black',
  areaTopColor: '#2962FF',
  areaBottomColor: 'rgba(41, 98, 255, 0.28)',
};


type ChartComponentProps = {
  data: SeriesDataItemTypeMap[SeriesType][],
  colors: {
    backgroundColor: string
    lineColor: string
    textColor: string
    areaTopColor: string
    areaBottomColor: string
  }
} & PropsWithChildren

const LiveChart: FC<ChartComponentProps> = (props) => {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [equityCurve, addEquityValue] = [
    useSelector((s: RootState) => s.contentTemp.tradelog),
    (v: EquityValue) => dispatch(contentTempActions.addEquityValue(v)),
  ]

  const {
    data,
    colors: {
      backgroundColor,
      lineColor,
      textColor,
      areaTopColor,
      areaBottomColor,
    }
  } = props;

  const ctnRef = useRef<HTMLDivElement | null>(null);
  let series: ISeriesApi<'Area'>

  // after comp mount 
  useEffect(
    () => {
      // create chart
      const chart = createChart(
        ctnRef?.current ? ctnRef.current : '',
        {
          layout: {
            background: {
              type: ColorType.Solid,
              color: backgroundColor
            },
            textColor,
          },
          width: ctnRef?.current?.clientWidth,
          height: 300,
        },
      );

      chart.timeScale().fitContent();

      // add data
      series = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor
      });
      series.setData(data);

      // event listener
      const handleResize = () => {
        chart.applyOptions({
          width: ctnRef?.current?.clientWidth
        });
      };
      window.addEventListener('resize', handleResize);




      const socket = new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`)

      socket.addEventListener('message', (e: MessageEvent<string>) => {
        const msg: WebSocketMessage = JSON.parse(e.data)
        if (msg.tag === 'EquityValue') {
          const { data: equityValue } = msg as TaggedMessage<EquityValue>
          addEquityValue(equityValue)
          console.log(equityValue)
          series?.update({
            time: equityValue.timestamp.split('T')[0],
            value: equityValue.equity
          })
        }
      })

      // clean up
      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  return (
    <div ref={ctnRef} />
  );
};

export default LiveChart

