import { Paper, styled, Typography } from '@mui/material'


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

export default function Home() {
  return (
    <Div>
      <Paper
        sx={{
          width: '100%',
          textAlign: 'center'
        }}>
        <Typography variant='h4'>Welcome to TrBox Console</Typography>
        <Typography variant='h5'>Hello World!</Typography>
        <Typography variant='h5'>This is the all-in-one algo trading dashboard you ever need.</Typography>
      </Paper>
    </Div>
  )
}
