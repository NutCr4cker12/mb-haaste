import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteCustomerContact, fetchCustomerContacts } from './customerContatSlices';
import { useContacts } from './Pages';

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
  const dispatch = useDispatch()
  // MB-TODO-DONE: Example response
  const { data, status, refetch } = useCustomerContacts(customerId)
  const { data: contacts } = useContacts()

  
  const deleteContact = (contactId) => {
    dispatch(deleteCustomerContact({ customerId, contactId }))
    refetch()
  }
  
  const customerContacts = data.map(n => ({
    ...n,
    contact: contacts.find(x => x.id === n.contactId)
  }))

  // MB-TODO-DONE: Implement fetch customer's contacts
  // MB-TODO-DONE: Implement add contact to customer
  // MB-TODO-DONE: Implement remove contact of customer
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
              <td>{`${customerContact.contact?.firstName} ${customerContact.contact?.lastName}`}</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteContact(customerContact.contactId)}
                  disabled={status === 'pending'}
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