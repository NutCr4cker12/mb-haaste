import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../api'
import { addDefaultThunkCases } from './extraReducer'

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
    addDefaultThunkCases(builder, fetchCustomerContacts, (state, action) => {
      return action.payload
    })
    addDefaultThunkCases(builder, addCustomerContact, (state, action) => {
      return state.data.concat(action.payload)
    })
    addDefaultThunkCases(builder, deleteCustomerContact, (state, action) => {
      const { customerId, contactId } = action.payload
      return state.data.filter(n => !(n.customerId === customerId && n.contactId === contactId))
    })
  }
})

export const customerContantsReducer = customerContactsSlice.reducer

// MB-TODO-DONE: create action for creating customer contacts. NOTE: remember to add them to `customerSlice`
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
    const { customerId } = data
    const result = await client(`/api/customers/${customerId}/contacts`, { data, method: 'POST' })
    return result
  }
)

export const deleteCustomerContact = createAsyncThunk(
  'customerContacts/delete',
  async (data) => {
    const { customerId, contactId } = data
    await client(`/api/customers/${customerId}/contacts/${contactId}`, { method: 'DELETE' })
    return data
  }
)