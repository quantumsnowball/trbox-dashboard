import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const tempSlice = createSlice({
  name: 'temp',
  initialState: {
    menuOpen: false,
  },
  reducers: {
    setMenuOpen: (s, a: PayloadAction<boolean>) => {
      s.menuOpen = a.payload
    },
  }
})

export const tempActions = tempSlice.actions

export const tempReducer = tempSlice.reducer


