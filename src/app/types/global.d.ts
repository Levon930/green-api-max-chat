import type { AppDispatch as StoreDispatch, RootState as StoreState } from '../store'

declare global {
  type RootState = StoreState
  type AppDispatch = StoreDispatch
}
