import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from './api'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

const customerContactsSlice = createSlice({
  name: 'customerContancts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerContacts.pending, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'idle') {
          state.status = 'pending'
          state.currentRequestId = requestId
        }
      })
      .addCase(fetchCustomerContacts.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.data = action.payload
          state.currentRequestId = null
        }
      })
      .addCase(fetchCustomerContacts.rejected, (state, action) => {
        const { requestId } = action.meta
        if(state.status === 'pending' && state.currentRequestId === requestId) {
          state.status = 'idle'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  }
})

export const customerContantsReducer = customerContactsSlice.reducer

// MB-TODO: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`
export const fetchCustomerContacts = createAsyncThunk(
  'customerContacts',
  async (customerId) => {
    const result = await client(`/api/customers/${customerId}/contacts`)
    return result
  },
  {
    condition: (_args, { getState }) => {
      const state = getState()
      const { customers } = state
      return customers.status !== 'pending'
    }
  }
)

export const addCustomerContact = createAsyncThunk(
  'customerContacts/add',
  async (data) => {
    const { customerId } = data;
    const result = await client(`/api/customers/${customerId}/contacts`, { data, method: 'POST' })
    return result
  }
)