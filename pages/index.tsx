import { Paper, Typography } from '@mui/material'


export default function Home() {
  return (
    <Paper
      sx={{
        width: '100%',
        textAlign: 'center'
      }}>
      <Typography variant='h4'>Welcome to TrBox Console</Typography>
      <Typography variant='h5'>Hello World!</Typography>
      <Typography variant='h5'>This is the all-in-one algo trading dashboard you ever need.</Typography>
    </Paper>
  )
}
