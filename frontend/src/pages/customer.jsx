import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useCustomer } from "../hooks/reduxHooks"
import { updateCustomer } from "../redux/customerSlices"
import MBTodo from "../components/MBTodo"
import NewCustomerContact from "../components/NewCustomerContact"
import CustomerContactTable from "../components/CustomerContactTable"

export const Customer = () => {
  const dispatch = useDispatch()
  const { customerId } = useParams()
  const { data: customer } = useCustomer(customerId)

  const handleSubmit = (event) => {
    // MB-TODO-DONE: Handle customer update
    event.preventDefault()

    const { isActive } = event.target;
    dispatch(updateCustomer({ 
      ...customer,
      isActive: isActive.value
    }))
  }

  return (
    <div className='m-5'>
      <h1 className='fw-bold'>Customer</h1>
      {customer
        ? <div>
          <form className='mb-5' onSubmit={handleSubmit}>
            <MBTodo
              isCompleted={true}
              task='Create solution to update customers `isActivity` field. NOTE: update api `/api/customer/:customerId` expects complete customer data to be sent along request body' />
            <div className='d-flex flex-row gap-4 mb-3' >
              <div>
                <label htmlFor="name" className="form-label">Name</label>
                <input className="form-control" id="name" value={customer.name || ''} readOnly />
              </div>
              <div>
                <label htmlFor="name" className="form-label">Country</label>
                <input className="form-control" id="country" value={customer.country || ''} readOnly />
              </div>
              <div style={{ minWidth: '33%' }}>
                <label htmlFor="isActive" className="form-label">Activity</label>
                <select className="form-control" id="isActive" defaultValue={customer.isActive} >
                  <option value={false} >Inactive</option>
                  <option value={true} >Active</option>
                </select>
                {/* <input className="form-control" id="isActive" value={customer.isActive ? 'Active' : 'Inactive'} /> */}
              </div>
            </div>
            <button className='btn btn-primary' type='submit'>Save</button>
          </form>
          <div>
            <p className='fw-bold'>Customer contacts</p>
            <NewCustomerContact customerId={customerId} />
            <MBTodo
              isCompleted={true}
              task='Continue CustomerContact table implementation' />
            <CustomerContactTable customerId={customerId} />
          </div>
        </div>
        : null
      }
    </div>
  )
}