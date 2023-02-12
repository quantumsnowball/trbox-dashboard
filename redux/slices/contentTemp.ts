import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderResult, TradeLog } from '../../components/tradelog/types'


const contentTempSlice = createSlice({
  name: 'contentTemp',
  initialState: {
    tradelog: [] as TradeLog
  },
  reducers: {
    addOrderResult: (s, a: PayloadAction<OrderResult>) => {
      s.tradelog.unshift(a.payload)
    },
    clearTradelog: s => { s.tradelog = [] }
  }
})

export const contentTempActions = contentTempSlice.actions

export const contentTempReducer = contentTempSlice.reducer

