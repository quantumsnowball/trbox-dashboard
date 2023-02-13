import LiveChart from '@/components/navs/LiveChart'
import { Paper, Typography } from '@mui/material'


export default function Navs() {
  return (
    <Paper
      sx={{
        width: '100%',
        textAlign: 'center'
      }}>
      <Typography variant='h4'>Equity Curve Section</Typography>
      <LiveChart />
    </Paper>
  )
}

