import { Paper, styled, Typography } from '@mui/material'
import TradingViewChart, { SAMPLE_COLOR, SAMPLE_DATA } from '../components/LightWeightChart'


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

export default function Navs() {
  return (
    <Div>
      <Paper
        sx={{
          width: '100%',
          textAlign: 'center'
        }}>
        <Typography variant='h4'>Equity Curve Section</Typography>
        <TradingViewChart data={SAMPLE_DATA} colors={{ ...SAMPLE_COLOR }} />
      </Paper>
    </Div>
  )
}

