export default defineNitroErrorHandler(async (error, event) => {
  setResponseStatus(event, error.statusCode || 500)

  const errorString = JSON.stringify({
    message: 'Failed',
    error: error.message,
  })
  const errorArray = new TextEncoder().encode(errorString)
  return send(event, errorArray, 'application/json')
})
