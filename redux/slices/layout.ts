import { createSlice } from '@reduxjs/toolkit'


const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuDrawer: {
      settings: {
        expanded: false,
      },
      about: {
        expanded: false,
      }
    }
  },
  reducers: {
    toggleSettings: s => {
      s.menuDrawer.settings.expanded = !s.menuDrawer.settings.expanded
    },
    toggleAbout: s => {
      s.menuDrawer.about.expanded = !s.menuDrawer.about.expanded
    }
  }
})

export const layoutActions = layoutSlice.actions

export const layoutReducer = layoutSlice.reducer


