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
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EquityValue, TaggedMessage, WebSocketMessage } from '../tradelog/types';


const LiveChart = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const socket = useRef(null as WebSocket | null)
  const [equityCurve, addEquityValue] = [
    useSelector((s: RootState) => s.contentTemp.tradelog),
    (v: EquityValue) => dispatch(contentTempActions.addEquityValue(v)),
  ]
  const ctnRef = useRef<HTMLDivElement | null>(null)
  const series = useRef<ISeriesApi<'Area'> | null>(null)
  const data = useRef([
    // { time: '2018-12-30', value: 22.68 },
    // { time: '2018-12-31', value: 22.67 },
  ] as SeriesDataItemTypeMap[SeriesType][])

  const backgroundColor = 'white'
  const lineColor = '#2962FF'
  const textColor = 'black'
  const areaTopColor = '#2962FF'
  const areaBottomColor = 'rgba(41, 98, 255, 0.28)'


  // when page navigate away
  const onPageLeave = (url: string) => {
    // only when leave from /tradelog
    if (url !== '/navs') {
      socket.current?.close()
      console.debug('ws disconnected')
    }
  }

  const onPageEnter = () => {
    // when enter pae /tradelog
    if (router.pathname === '/navs') {
      // connect to socket if there is not already a connection
      if (!socket.current) {
        socket.current = new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`)
        console.debug('ws connected')
        // start to listen to message 
        socket.current.addEventListener('message', (e: MessageEvent<string>) => {
          const msg: WebSocketMessage = JSON.parse(e.data)
          if (msg.tag === 'EquityValue') {
            const { data: equityValue } = msg as TaggedMessage<EquityValue>
            addEquityValue(equityValue)
            console.debug(msg.tag)
            series.current?.update({
              time: equityValue.timestamp.split('T')[0],
              value: equityValue.equity
            })
          }
        })
        // when comp mounted
        router.events.on('routeChangeStart', onPageLeave)
        console.debug('listening page leave event')
      } else {
        console.debug('using existing socket')
      }
    }
  }

  // after comp mount 
  useEffect(() => {
    // create chart
    const chart = createChart(ctnRef?.current ? ctnRef.current : '',
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
    series.current = chart.addAreaSeries({
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor
    });
    series.current.setData(data.current);

    // add event listener
    const handleResize = () => {
      chart.applyOptions({
        width: ctnRef?.current?.clientWidth
      });
    };
    window.addEventListener('resize', handleResize);


    // 
    // when mounted
    onPageEnter()

    // clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      console.debug('unmounted/refresh/exit')
    };
  }, []);

  return (
    <div ref={ctnRef} />
  );
};

export default LiveChart

