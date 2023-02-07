import { Box, Divider, SwipeableDrawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { APP_NAME, VERSION } from '../../../common/constants'
import { layoutTempActions } from '../../../redux/slices/layoutTemp'
import { RootState } from '../../../redux/store'
import AboutMenu from './AboutMenu'
import { MenuTitle } from './common'


function MenuDrawer() {
  const dispatch = useDispatch()
  const [menuState, openMenu, closeMenu] = [
    useSelector((s: RootState) => s.layoutTemp.menu.visible),
    () => dispatch(layoutTempActions.openMenu()),
    () => dispatch(layoutTempActions.closeMenu()),
  ]

  return (
    <SwipeableDrawer
      disableSwipeToOpen
      anchor="left"
      open={menuState}
      onOpen={openMenu}
      onClose={closeMenu}
    >
      <Box
        sx={{
          width: 250
        }}
        role="presentation"
        onClick={closeMenu}
        onKeyDown={closeMenu}
      >
        <MenuTitle title={`${APP_NAME}, ${VERSION}`} />
        <Divider />
        <AboutMenu />
      </Box>
    </SwipeableDrawer>
  )
}

export default MenuDrawer


