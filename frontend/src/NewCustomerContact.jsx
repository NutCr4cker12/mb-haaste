import PropTypes from 'prop-types';
import { useCustomerContacts } from './CustomerContactTable';
import { useContacts } from './Pages';
import { useState } from 'react';
import { addCustomerContact } from './customerContatSlices';
import { useDispatch } from 'react-redux';

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
                <option value='' selected={selectedContactId === ''}>Select customer contact</option>
                {availableContacts.map((contact, idx) => {
                  return (
                    <option key={idx} value={contact.id} selected={contact.id === selectedContactId}>
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