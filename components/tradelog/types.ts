export type Tag = 'OrderResult' | 'EquityCurve'
export type WebSocketMessage = {
  tag: Tag,
  data: any
}
export type TaggedMessage<T> = {
  tag: Tag,
  data: T
}

export type OrderResult = {
  timestamp: string
  symbol: string
  action: string
  price: number
  quantity: number
}
export type TradeLog = OrderResult[]


