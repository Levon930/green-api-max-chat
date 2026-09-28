export type AppThunk<Result = void> = (dispatch: AppDispatch, getState: () => RootState) => Result
