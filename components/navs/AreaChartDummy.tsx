import {
  createChart,
  ColorType,
  SeriesDataItemTypeMap,
  SeriesType,
  ISeriesApi,
} from 'lightweight-charts';
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';


export const SAMPLE_DATA = [
  { time: '2018-12-22', value: 32.51 },
  { time: '2018-12-23', value: 31.11 },
  { time: '2018-12-24', value: 27.02 },
  { time: '2018-12-25', value: 27.32 },
  { time: '2018-12-26', value: 25.17 },
  { time: '2018-12-27', value: 28.89 },
  { time: '2018-12-28', value: 25.46 },
  { time: '2018-12-29', value: 23.92 },
  { time: '2018-12-30', value: 22.68 },
  { time: '2018-12-31', value: 22.67 },
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

const AreaChartDummy: FC<ChartComponentProps> = (props) => {
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

      // clean up
      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
  );

  // try to update chart data
  useEffect(() => {
    const BASE = 22.67
    const SCALE = 2
    const INTERVAL = 2000
    const START_DATE = new Date('2019-01-01')
    const ONE_DAY = 60 * 60 * 24 * 1000
    // do every 2 secs 
    let delta = 0
    const timer = setInterval(() => {
      const value = BASE + Math.random() * SCALE;
      const time = new Date(START_DATE.getTime() + delta * ONE_DAY).toISOString().slice(0, 10)
      delta++
      console.log(time)
      series.update({ time, value })
    }, INTERVAL)

    // remove timer
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div ref={ctnRef} />
  );
};

export default AreaChartDummy
