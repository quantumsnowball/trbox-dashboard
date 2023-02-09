import { Button, Paper, styled, Typography } from '@mui/material'
import { useEffect } from 'react';
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

export default function TradeLog() {
  const socket = io('ws://localhost:5000')

  useEffect(() => {
    // connect to ws
    //
    // regularly send message to ws
    // clean up timer
    return () => {
    }
  }, [])
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
          console.log('trying to send message to ws')
          socket.send('hello I am ReactJS')
        }}
      >
        Send
      </Button>
    </Div>
  )
}


