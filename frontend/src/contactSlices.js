import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from './api'
import { addDefaultThunkCases } from './extraReducer'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
  currentRequestId: null
}

// CONTACTS
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addDefaultThunkCases(builder, fetchContacts, (state, action) => action.payload)
  }
})
export const contactReducer = contactsSlice.reducer

export const fetchContacts = createAsyncThunk(
  'contacts',
  async () => {
    const result = await client('/api/contacts')
    return result
  },
  {
    condition: (_args, { getState }) => {
      const { contacts } = getState()
      return contacts.status !== 'pending'
    }
  }
)
