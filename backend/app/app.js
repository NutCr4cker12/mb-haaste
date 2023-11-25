import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import errorHandler from './errorHandler.js'
import routes from './routes.js'

const app = express()

// MB-TODO: What are middlewares in Express?
// Middlewares in express are functions that are run before the actual route handler.
// Middlewares have acces to the Request, Response (and error in case of error handler middleware)
// that the middleware can alter.
// Middlewares can be scoped to be application or route. Application wide middleware is run before any route handler
// (for example authentication, cors / security related middleware and error handlers are common usecases).
// Route level middleware (for example authoriation)

// MB-TODO: What these middlewares do?
// parses incoming requests with JSON payloads so that the request.body is an JSON object
app.use(express.json())
// Parses the incoming request body into a object which is then accessible through req.body. The extended: true option ensures that the parsing can handle complex nested objects.
app.use(express.urlencoded({ extended: true }))
// Helmet provides several security related improvements by altering and setting various HTTP headers.
app.use(helmet())
// Morgan is a Node.express logging library. Option 'tiny' configures Morgan to use 'tiny' predefined format for logging.
app.use(morgan('tiny'))

app.use(routes)
// Custom error handler middleware. Handles all errors that occurred during the execution of the request.
app.use(errorHandler)

export default app
