import CustomerTable from "../components/CustomerTable"
import NewCustomer from "../components/NewCustomer"
import { useCustomers } from "../hooks/reduxHooks"

export const Customers = () => {
  const { data: customers, status, error, refetch } = useCustomers()

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customers</h1>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-success' onClick={refetch}>
          <i className="bi bi-arrow-clockwise" />
          {' '}
          Refresh
        </button>
        <NewCustomer />
      </div>
      <div>
        {error
          ? <div className="alert alert-danger d-inline-block" role="alert">{error.message}</div>
          : null
        }
        {status === 'pending'
          ? 'Loading...'
          : <CustomerTable customers={customers} />
        }
      </div>
    </div>
  )
}