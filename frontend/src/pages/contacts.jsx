import ContactTable from "../components/ContactTable"
import { useContacts } from "../hooks/reduxHooks"

export const Contacts = () => {
  const { data: contacts, status, error, refetch } = useContacts()
  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Contacts</h1>
      <button className='btn btn-success' onClick={refetch}>
        <i className="bi bi-arrow-clockwise" />
        {' '}
        Refresh
      </button>
      {error
        ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
        : null
      }
      <div>
        {status === 'pending'
          ? 'Loading...'
          : <ContactTable contacts={contacts} />
        }
      </div>
    </div>
  )
}