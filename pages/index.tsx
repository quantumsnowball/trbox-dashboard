import { styled } from '@mui/material'


const Div = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
`;

export default function Home() {
  return (
    <Div>
      <h1>Welcome to TrBox Console</h1>
      <h2>Hello World!</h2>
      <h2>This is the all-in-one algo trading dashboard you ever need.</h2>
    </Div>
  )
}
