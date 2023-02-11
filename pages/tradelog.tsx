import { Button, Paper, styled, Typography } from '@mui/material'
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
const DEV_DOMAIN = 'localhost'


export default function TradeLog() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [msgList, setMsgList] = useState([] as string[])

  // try to connect after first render
  useEffect(() => {
    // const hostname = process.env.NODE_ENV === 'production' ? window.location.hostname : DEV_DOMAIN
    setSocket(() => new WebSocket(`ws://${window.location.hostname}:${PORT_WS}`))
  }, [])

  // register handlers if connected
  useEffect(() => {
    socket?.addEventListener('message', msg => {
      console.log(msg)
      setMsgList(msgList => [...msgList, msg.data.toString()])
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
      {
        msgList.map(
          (msg: string) =>
            <Typography
              key={msg}
              variant='h6'
            >{msg}
            </Typography>
        )
      }
    </Div>
  )
}


