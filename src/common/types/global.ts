export class ResponseDataType<T> {

  message: string
  data: T
  timestamp: string

  constructor(data: T = null, message = 'success') {
    this.message = message
    this.data = data
    this.timestamp = new Date().toLocaleString()
  }
}

export interface PrimitiveResponseData<T> {
  data: T
}