import { Button, Paper, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { io } from "socket.io-client";


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
const DEV_DOMAIN = 'localhost:5000'
// p.s. same instance of socket is reused
const socket = (process.env.NODE_ENV === "production") ? io() : io(DEV_DOMAIN)


export default function TradeLog() {
  const [msgList, setMsgList] = useState([] as string[])

  useEffect(() => {
    // register handlers
    socket.on('message', (msg: string) => {
      setMsgList(msgList => [...msgList, msg])
    })
    // regularly send message to ws
    // clean up timer
    return () => {
    }
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
          socket.send(new Date().getTime())
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


