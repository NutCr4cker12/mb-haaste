import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from './api'
import { addDefaultThunkCases } from './extraReducer'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

// CUSTOMERS
const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addDefaultThunkCases(builder, fetchCustomers, (state, action) => { 
      return action.payload
    })
    addDefaultThunkCases(builder, fetchCustomerById, (state, action) => {
      return state.data.concat(action.payload)
    })
    addDefaultThunkCases(builder, createCustomer, (state, action) => {
      return state.data.concat(action.payload)
    })
    addDefaultThunkCases(builder, updateCustomer, (state, action) => {
      return state.data.map(customer => {
        if (customer.id !== action.payload.id) {
          return customer
        }
        return action.payload
      })
    })
  },
})
export const customerReducer = customersSlice.reducer

export const fetchCustomers = createAsyncThunk(
  'customers',
  async () => {
    const result = await client('/api/customers')
    return result
  },
  {
    condition: (_args, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending'
    }
  }
)

export const fetchCustomerById = createAsyncThunk(
  'customers/fetchById',
  async (id) => {
    const result = await client(`/api/customers/${id}`)
    return result
  },
  {
    condition: (id, { getState }) => {
      const { customers } = getState()
      return customers.status !== 'pending' && !customers.data.some(customer => customer.id === id)
    }
  }
)

export const createCustomer = createAsyncThunk(
  'customers/create',
  async (data) => {
    const result = await client(`/api/customers`, { data, method: 'POST' })
    return result
  }
)

export const updateCustomer = createAsyncThunk(
  'customer/update',
  async (data) => {
    const { id } = data
    const result = await client(`/api/customers/${id}`, { data, method: 'PUT' })
    return result
  }
)