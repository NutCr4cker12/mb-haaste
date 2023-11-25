import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCustomerContacts } from './customerContatSlices';

export const useCustomerContacts = (customerId) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCustomerContacts(customerId))
  }, [dispatch, customerId])
  const refetch = () => dispatch(fetchCustomerContacts(customerId))
  const { data, status, error } = useSelector(state => state.customerContacts)
  return { data, status, error, refetch }
}

const Table = ({ customerId }) => {
  // MB-TODO-DONE: Example response
  const { data: customerContacts , status, error, refetch } = useCustomerContacts(customerId)
  
  // MB-TODO-DONE: Implement fetch customer's contacts
  // MB-TODO: Implement add contact to customer
  // MB-TODO: Implement remove contact of customer
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {customerContacts.map((customerContact, index) => {
          return (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{customerContact.contactId}</td>
              <td>
                <button
                  className='btn btn-danger'
                >
                  Delete
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  customerId: PropTypes.string.isRequired
}


export default Table