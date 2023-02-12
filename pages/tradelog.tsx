import { Button, Paper, styled, Typography } from '@mui/material'
import TradeLogTable from '@/components/tradelog/table';
import { useDispatch } from 'react-redux';
import { contentTempActions } from '@/redux/slices/contentTemp';


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
  const dispatch = useDispatch()
  const clearTradeLog = () => dispatch(contentTempActions.clearTradelog())
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
        onClick={clearTradeLog}
      >
        Clear
      </Button>
      <TradeLogTable />
    </Div>
  )
}


