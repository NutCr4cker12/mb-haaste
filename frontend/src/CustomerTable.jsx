import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import MBTodo from './MBTodo';
import { useState } from 'react';

const Table = ({ customers }) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(() => {
    const storageFilters = window.localStorage.getItem('customerTableFilters')
    if (!storageFilters) {
      return { isActive: 'None' }
    }
    return JSON.parse(storageFilters)
  })
  
  const clicker = (customer) => {
    navigate(customer.id);
  }

  const setIsActiveFilter = (event) => {
    let value = event.target.value
    // Don't set true | false as string values
    if (value !== 'None') {
      value = value === 'true'
    }
    
    setFilters(prevState => {
      const newFilters = {
        ...prevState,
        isActive: value
      }
      window.localStorage.setItem('customerTableFilters', JSON.stringify(newFilters))
      return newFilters
    })
    
  }

  return (
    <>
      <div className='card my-3'>
        <div className='card-body'>
          <i className="bi bi-filter" />
          {' '}
          Filters
          <div className='d-flex mt-3 align-items-center'>
            <MBTodo isCompleted={true} task='Create solution to filters customers by activity' />
            <p className='fw-bold col-1 mb-0'>Is Active</p>
            <select className="form-select" value={filters.isActive} onChange={setIsActiveFilter}>
              <option value='None'>Any</option>
              <option value={false}>❌</option>
              <option value={true}>✅</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Country</th>
            <th scope="col">Is Active</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter(customer => filters.isActive === 'None' || customer.isActive === filters.isActive)
            .map((customer, index) => {
              return (
                <tr
                  key={index}
                  className=''
                  onClick={() => clicker(customer)}
                >
                  <td scope="row">{index + 1}</td>
                  <td>{customer.name}</td>
                  <td>{customer.country}</td>
                  <td>{customer.isActive ? '✅' : '❌'}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </>
  )
}

Table.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    isActive: PropTypes.bool
  }))
}


export default Table