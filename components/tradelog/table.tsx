import { OrderResult, TaggedMessage, WebSocketMessage } from './types';
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { contentTempActions } from '@/redux/slices/contentTemp';


// connect to ws
const PORT_WS = 8000


export default function TradeLogTable() {
  const dispatch = useDispatch()
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [tradelog, addOrderResult] = [
    useSelector((s: RootState) => s.contentTemp.tradelog),
    (r: OrderResult) => dispatch(contentTempActions.addOrderResult(r)),
  ]

  // try to connect after first render
  useEffect(() => {
    setSocket(() => new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`))
  }, [])

  // register handlers if connected
  useEffect(() => {
    socket?.addEventListener('message', (e: MessageEvent<string>) => {
      const msg: WebSocketMessage = JSON.parse(e.data)
      if (msg.tag === 'OrderResult') {
        const { data: orderResult } = msg as TaggedMessage<OrderResult>
        addOrderResult(orderResult)
      }
    })
  }, [socket])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradelog.map(({ timestamp, symbol, action, price, quantity }) => (
            <TableRow
              key={timestamp}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"> {timestamp} </TableCell>
              <TableCell align="right">{symbol}</TableCell>
              <TableCell align="right">{action}</TableCell>
              <TableCell align="right">{price}</TableCell>
              <TableCell align="right">{quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}



