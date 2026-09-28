import type { GreenApiCredentials } from '@/shared/api'

export type Credentials = GreenApiCredentials

export interface SessionState {
  credentials: Credentials | null
}
