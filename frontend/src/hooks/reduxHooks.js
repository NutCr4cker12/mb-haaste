import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContacts } from "../redux/contactSlices"
import { fetchCustomerById, fetchCustomers } from "../redux/customerSlices"
import { fetchCustomerContacts } from "../redux/customerContatSlices"

export const useCustomers = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])
  const refetch = () => dispatch(fetchContacts())
  const { data, status, error } = useSelector(state => state.customers)
  return { data, status, error, refetch }
}

export const useCustomer = (id) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if(id) {
      dispatch(fetchCustomerById(id))
    }
  }, [id, dispatch])
  const { data: customers, status, error } = useSelector(state => state.customers)
  const customer = customers.find(customer => customer.id === id)
  return { data: customer, status, error }
}

export const useContacts = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])
  const refetch = () => dispatch(fetchContacts())
  const { data, status, error } = useSelector(state => state.contacts)
  return { data, status, error, refetch }
}

export const useCustomerContacts = (customerId) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCustomerContacts(customerId))
  }, [dispatch, customerId])
  const refetch = () => dispatch(fetchCustomerContacts(customerId))
  const { data, status, error } = useSelector(state => state.customerContacts)
  return { data, status, error, refetch }
}