import { Paper, Typography } from '@mui/material'
import AreaChartDummy, { SAMPLE_COLOR, SAMPLE_DATA } from '../components/AreaChartDummy'


export default function Navs() {
  return (
    <Paper
      sx={{
        width: '100%',
        textAlign: 'center'
      }}>
      <Typography variant='h4'>Equity Curve Section</Typography>
      <AreaChartDummy data={SAMPLE_DATA} colors={{ ...SAMPLE_COLOR }} />
    </Paper>
  )
}

