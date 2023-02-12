import { TaggedMessage, WebSocketMessage } from '../components/tradelog/types';
import { Button, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useEffect, useState } from 'react';


const Div = styled('div')`
  /* take all vertical space */
  height: 100%;
  /* single item each row */
  display: flex;
  flex-flow: column nowrap;
  /* align vertically */
  justify-content: center;
  /* align horizontally */
  align-items: center;
`;

// connect to ws
const PORT_WS = 8000

type OrderResult = {
  timestamp: string
  symbol: string
  action: string
  price: number
  quantity: number
}


export default function TradeLog() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [tradelog, setTradelog] = useState([] as OrderResult[])

  // try to connect after first render
  useEffect(() => {
    // const hostname = process.env.NODE_ENV === 'production' ? window.location.hostname : DEV_DOMAIN
    setSocket(() => new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`))
  }, [])

  // register handlers if connected
  useEffect(() => {
    socket?.addEventListener('message', (e: MessageEvent<string>) => {
      const msg: WebSocketMessage = JSON.parse(e.data)
      if (msg.tag === 'OrderResult') {
        const { data: orderResult } = msg as TaggedMessage<OrderResult>
        setTradelog(tradelog => [orderResult, ...tradelog])
      }
    })
  }, [socket])

  return (
    <Div>
      <Paper
        sx={{
          width: '100%',
          textAlign: 'center'
        }}>
        <Typography variant='h4'>Trade Log Section</Typography>
      </Paper>
      <Button
        variant='contained'
        onClick={() => {
          try {
            socket?.send((new Date().getTime()).toString())
          } catch (err) {
            console.log(err)
          }
        }}
      >
        Send
      </Button>
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
    </Div>
  )
}


