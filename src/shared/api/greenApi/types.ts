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
}

export interface GreenApiQueryError {
  message: string
  status?: number
}

export interface GreenApiMeta {
  idInstance: string
}
