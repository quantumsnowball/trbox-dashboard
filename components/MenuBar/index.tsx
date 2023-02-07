import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link"


const PageLink = ({ title, href }: { title: string, href: string }) =>
  <Typography
    variant='h6'
    sx={{
      mx: 1
    }}
  >
    <Link href={href}>{title}</Link>
  </Typography>


const MenuBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          TRBOX
        </Typography>
        <PageLink title='Home' href='/' />
        <PageLink title='Navs' href='/' />
        <PageLink title='Trade Log' href='/' />
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
