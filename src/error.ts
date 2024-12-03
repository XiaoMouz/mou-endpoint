export default defineNitroErrorHandler(async (error, event) => {
  setResponseStatus(event, error.statusCode || 500)

  //[warn]: wtf, cannot return object, must return array or buffer
  const errorString = JSON.stringify({
    message: 'Failed',
    error: error.message,
  })
  const errorArray = new TextEncoder().encode(errorString)
  return send(event, errorArray, 'application/json')
})
