import { Box, Divider, SwipeableDrawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { APP_NAME, VERSION } from '../../../common/constants'
import { tempActions } from '../../../redux/slices/temp'
import { RootState } from '../../../redux/store'
import AboutMenu from './AboutMenu'
import { MenuTitle } from './common'


function MenuDrawer() {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = [
    useSelector((s: RootState) => s.temp.menuOpen),
    (open: boolean) => dispatch(tempActions.setMenuOpen(open))
  ]

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      anchor="left"
      open={menuOpen}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
    >
      <Box
        sx={{
          width: 250
        }}
        role="presentation"
        onClick={() => setMenuOpen(false)}
        onKeyDown={() => setMenuOpen(false)}
      >
        <MenuTitle title={`${APP_NAME}, ${VERSION}`} />
        <Divider />
        <AboutMenu />
      </Box>
    </SwipeableDrawer>
  )
}

export default MenuDrawer


