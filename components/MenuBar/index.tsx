import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuDrawer from "./MenuDrawer";
import { useDispatch } from "react-redux";
import { tempActions } from "@/redux/slices/temp";
import { APP_TITLE } from "@/common/constants";

const AppTitle = () =>
  <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
    {APP_TITLE}
  </Typography>

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
  const dispatch = useDispatch()
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const toggleMenuDrawer = () => dispatch(tempActions.toggleMenuOpen())

  return (
    <>
      <AppBar>
        <Toolbar sx={{ p: 1 }}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleMenuDrawer}
          >
            <MenuIcon />
          </IconButton>
          <AppTitle />
          {
            isSmall ? null :
              <>
                <PageLink title='Home' href='/' />
                <PageLink title='Navs' href='/' />
                <PageLink title='Trade Log' href='/' />
              </>
          }
        </Toolbar>
      </AppBar>
      <MenuDrawer />
    </>
  )
}

export default MenuBar
