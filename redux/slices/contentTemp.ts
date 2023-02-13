import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderResult, TradeLog } from '../../components/tradelog/types'


const contentTempSlice = createSlice({
  name: 'contentTemp',
  initialState: {
    // equityCurve: [] as EquityCurve,
    tradelog: [] as TradeLog
  },
  reducers: {
    // addEquityValue: (s, a: PayloadAction<EquityValue>) => {
    //   s.equityCurve.push(a.payload)
    // },
    addOrderResult: (s, a: PayloadAction<OrderResult>) => {
      s.tradelog.unshift(a.payload)
    },
    setTradeLog: (s, a: PayloadAction<TradeLog>) => {
      s.tradelog = a.payload
    },
    clearTradeLog: s => { s.tradelog = [] }
  }
})

export const contentTempActions = contentTempSlice.actions

export const contentTempReducer = contentTempSlice.reducer

