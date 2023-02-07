import { createSlice } from '@reduxjs/toolkit'


const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    menuDrawer: {
      about: {
        expanded: false,
      }
    }
  },
  reducers: {
    toggleAbout: s => {
      s.menuDrawer.about.expanded = !s.menuDrawer.about.expanded
    }
  }
})

export const layoutActions = layoutSlice.actions

export const layoutReducer = layoutSlice.reducer


