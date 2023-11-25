import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomerContact } from '../redux/customerContatSlices';
import { useContacts, useCustomerContacts } from '../hooks/reduxHooks';

const NewCustomerContact = ({ customerId }) => {
  const dispatch = useDispatch()
  const [selectedContactId, setSelectedContactId] = useState('')
  const { data: customerContacts, status } = useCustomerContacts(customerId)
  const { data: contacts } = useContacts()

  const customerContactIds = customerContacts.map(n => n.contactId)
  const availableContacts = contacts.filter(n => !customerContactIds.includes(n.id))

  const handleSelectChange = (event) => {
    setSelectedContactId(event.target.value)
  }

  const handleAddCustomerContact = () => {
    // Don't add if nothing is selected
    if (!selectedContactId) {
      return
    }

    dispatch(addCustomerContact({ customerId, contactId: selectedContactId }))
    setSelectedContactId('')
  }

  return (
    <div className="">
      <div className="row">
          <div className="col d-flex align-items-start">
              <select className="form-select" name="exampleSelect" id="exampleSelect" value={selectedContactId} onChange={handleSelectChange}>
                <option value='' >Select customer contact</option>
                {availableContacts.map((contact, idx) => {
                  return (
                    <option key={idx} value={contact.id} >
                      {`${contact.firstName} ${contact.lastName}`}
                      </option>
                  )
                })}
              </select>
          </div>
          <div className="col d-flex align-items-start">
            <button 
              className='btn btn-outline-primary' 
              onClick={handleAddCustomerContact}
              disabled={status === 'pending'}
            >
              <i className="bi bi-plus" />
              {' '}
              Add customer contact
            </button>
          </div>
      </div>
  </div>
    
  )
}

NewCustomerContact.propTypes = {
  customerId: PropTypes.string.isRequired
}

export default NewCustomerContact