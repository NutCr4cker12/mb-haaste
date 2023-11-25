export const addDefaultThunkCases = (builder, thunk, updateState) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      const { requestId } = action.meta
      if(state.status === 'idle') {
        state.status = 'pending'
        state.currentRequestId = requestId
      }
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const { requestId } = action.meta
      if(state.status === 'pending' && state.currentRequestId === requestId) {
        state.status = 'idle'
        state.data = updateState(state, action)
        state.currentRequestId = null
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      const { requestId } = action.meta
      if(state.status === 'pending' && state.currentRequestId === requestId) {
        state.status = 'idle'
        state.error = action.error
        state.currentRequestId = null
      }
    })
}