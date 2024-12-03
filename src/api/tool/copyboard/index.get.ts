import { auth } from '~/middleware/auth'

export default defineEventHandler({
  onRequest: auth,
  handler: async (evt) => {},
})
