export type Tag = 'OrderResult' | 'EquityCurve'
export type WebSocketMessage = {
    tag: Tag,
    data: any
}
export type TaggedMessage<T> = {
    tag: Tag,
    data: T
}

