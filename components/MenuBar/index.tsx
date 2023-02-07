import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


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
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          TRBOX
        </Typography>
        {isSmall ?
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          :
          <>
            <PageLink title='Home' href='/' />
            <PageLink title='Navs' href='/' />
            <PageLink title='Trade Log' href='/' />
          </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
