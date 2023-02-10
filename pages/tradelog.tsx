import { Button, Paper, styled, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react';


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
const DOMAIN = 'localhost:5000'
const DEV_DOMAIN = 'localhost:5000'
// p.s. same instance of socket is reused
// const socket = (process.env.NODE_ENV === "production") ? io() : io(DEV_DOMAIN)


export default function TradeLog() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [msgList, setMsgList] = useState([] as string[])

  useEffect(() => {
    setWs(() => new WebSocket(`ws://${process.env.NODE_ENV === 'production' ? DOMAIN : DEV_DOMAIN}`))
  }, [])
  useEffect(() => {
    // register handlers
    ws?.addEventListener('message', msg => {
      console.log(msg)
      setMsgList(msgList => [...msgList, msg.data.toString()])
    })
  }, [ws])
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
          // socket.send(new Date().getTime())
          ws?.send((new Date().getTime()).toString())
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


