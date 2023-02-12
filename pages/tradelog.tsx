import { TaggedMessage, WebSocketMessage } from '../components/tradelog/types';
import { Button, Paper, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import TradeLogTable from '@/components/tradelog/table';


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
        onClick={() => alert('gonna clear the table')}
      >
        Clear
      </Button>
      <TradeLogTable />
    </Div>
  )
}


