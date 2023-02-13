import { PORT_WS } from '@/common/constants';
import {
  createChart,
  ColorType,
  SeriesDataItemTypeMap,
  SeriesType,
  ISeriesApi,
} from 'lightweight-charts';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { EquityCurve, EquityValue, TaggedMessage, WebSocketMessage } from '../tradelog/types';


const LiveChart = () => {
  const router = useRouter()
  const socket = useRef(null as WebSocket | null)
  const ctnRef = useRef<HTMLDivElement | null>(null)
  const series = useRef<ISeriesApi<'Area'> | null>(null)
  const initialData = useRef([
    // { time: '2018-12-30', value: 22.68 },
    // { time: '2018-12-31', value: 22.67 },
  ] as SeriesDataItemTypeMap[SeriesType][])

  // when data is being set
  const onDataReady = () => {
    // create chart
    const chart = createChart(ctnRef?.current ? ctnRef.current : '',
      {
        layout: {
          background: {
            type: ColorType.Solid,
            color: 'white',
          },
          textColor: 'black',
        },
        width: ctnRef?.current?.clientWidth,
        height: 300,
      },
    );
    console.debug('chart created')
    // add data
    series.current = chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)'
    });
    series.current.setData(initialData.current);
    chart.timeScale().fitContent();
    console.debug('data injected')
    // add event listener
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
      console.debug('chart removed')
    };
  }

  // when page navigate away
  const onPageLeave = (url: string) => {
    // only when leave from /tradelog
    if (url !== '/navs') {
      socket.current?.close()
      console.debug('ws disconnected')
    }
  }

  // when page enter into
  const onPageEnter = () => {
    // when enter pae /tradelog
    if (router.pathname === '/navs') {
      // connect to socket if there is not already a connection
      if (!socket.current) {
        socket.current = new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`)
        console.debug('ws connected')
        socket.current.addEventListener('open', () => {
          socket.current?.send('EquityValueHistoryRequest')
        })
        // start to listen to message 
        socket.current.addEventListener('message', (e: MessageEvent<string>) => {
          const msg: WebSocketMessage = JSON.parse(e.data)
          if (msg.tag === 'EquityValue') {
            const { data: equityValue } = msg as TaggedMessage<EquityValue>
            console.debug(msg.tag)
            series.current?.update({
              time: equityValue.timestamp.split('T')[0],
              value: equityValue.equity
            })
          } else if (msg.tag === 'EquityCurveHistory') {
            const { data: equityValueHistory } = msg as TaggedMessage<EquityCurve>
            console.log(equityValueHistory)
            initialData.current = equityValueHistory.map(
              ({ timestamp, equity }) => ({
                time: timestamp.split('T')[0],
                value: equity
              }))
            onDataReady()
            // lab: try to set initialData
            // initialData.current = [
            //   { time: '2018-12-30', value: 22.68 },
            //   { time: '2018-12-31', value: 22.67 },
            // ]
            // series.current?.setData(initialData.current)
            // console.warn('setting initialData')
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
    // when mounted
    onPageEnter()
    // clean up
    return () => {
      console.debug('unmounted/refresh/exit')
    };
  }, []);

  return (
    <div ref={ctnRef} />
  );
};

export default LiveChart

