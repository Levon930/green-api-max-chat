export interface GreenApiCredentials {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export interface GreenApiRequest {
  method: string
  suffix?: string
  httpMethod?: 'GET' | 'POST' | 'DELETE'
  body?: unknown
  credentials?: GreenApiCredentials
  timeout?: number
}

export interface GreenApiQueryError {
  message: string
  status?: number
}

export interface GreenApiMeta {
  idInstance: string
}
