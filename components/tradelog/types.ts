export type Tag = 'OrderResult' | 'EquityValue' | 'EquityCurveHistory'
export type WebSocketMessage = {
  tag: Tag,
  data: any
}
export type TaggedMessage<T> = {
  tag: Tag,
  data: T
}

export type EquityValue = {
  timestamp: string
  equity: number
}
export type EquityCurve = EquityValue[]

export type OrderResult = {
  timestamp: string
  symbol: string
  action: string
  price: number
  quantity: number
}
export type TradeLog = OrderResult[]


