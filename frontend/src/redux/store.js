import { configureStore } from '@reduxjs/toolkit'
import { customerReducer } from './customerSlices'
import { contactReducer } from './contactSlices'
import { customerContantsReducer } from './customerContatSlices'

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    contacts: contactReducer,
    customerContacts: customerContantsReducer,
  },
})