import express from 'express';
import { Contacts, CustomerContacts, Customers } from './models.js';
import { NotFound } from './errorHandler.js';

const routes = express.Router()

routes.get('/ping', (_req, res) => {
  return res.send({ message: 'pong' })
})

// Customers
routes.get('/api/customers', async (_req, res) => {
  const customers = await Customers.getAll()
  return res.send(customers)
})

routes.get('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params
  const customer = await Customers.get(customerId)
  if(!customer) {
    throw new NotFound('Customer Not Found')
  }
  return res.send(customer)
})

routes.post('/api/customers', async (req, res) => {
  const customers = await Customers.add(req.body)
  return res.send(customers)
})

// MB-TODO-DONE: Create route for updating customer
routes.put('/api/customers/:customerId', async (req, res) => {
  const { customerId } = req.params
  const body = {
    ...req.body,
    isActive: req.body.isActive === 'true'
  }
  const customer = await Customers.update(customerId, body)
  if (!customer) {
    throw new NotFound('Customer Not Found')
  }
  return res.send(customer)
})

// Contacts
routes.get('/api/contacts', async (_req, res) => {
  const contacts = await Contacts.getAll()
  return res.send(contacts)
})

routes.get('/api/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params
  const contact = await Contacts.get(contactId)
  if(!contact) {
    throw new NotFound('Contact not found')
  }
  return res.send(contact)
})

routes.post('/api/contacts', async (req, res) => {
  const contacts = await Contacts.add(req.body)
  return res.send(contacts)
})

// MB-TODO-DONE: Create route for fetching contacts of a customer `/api/customers/:customerId/contacts`
routes.get('/api/customers/:customerId/contacts', async (req, res) => {
  const { customerId } = req.params
  const contacts = await CustomerContacts.getAll(customerId)
  return res.send(contacts)
})

// MB-TODO-DONE: Create route for adding contact to a customer `/api/customers/:customerId/contacts`
routes.post('/api/customers/:customerId/contacts', async (req, res) => {
  const { customerId } = req.params
  const { contactId } = req.body
  const contacts = await CustomerContacts.add(customerId, contactId)
  return res.send(contacts)
})

// MB-TODO-DONE:s Create route for deleting contact of customer `/api/customers/:customerId/contacts/:contactId`
routes.delete('/api/customers/:customerId/contacts/:contactId', async (req, res) => {
  const { customerId, contactId } = req.params
  await CustomerContacts.delete(customerId, contactId)
  return res.send({})
})

export default routes
