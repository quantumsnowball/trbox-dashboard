import LiveChart from '@/components/navs/LiveChart'
import { Paper, Typography } from '@mui/material'
import { SAMPLE_COLOR, SAMPLE_DATA } from '../components/navs/LiveChart'


export default function Navs() {
  return (
    <Paper
      sx={{
        width: '100%',
        textAlign: 'center'
      }}>
      <Typography variant='h4'>Equity Curve Section</Typography>
      <LiveChart data={SAMPLE_DATA} colors={{ ...SAMPLE_COLOR }} />
    </Paper>
  )
}

