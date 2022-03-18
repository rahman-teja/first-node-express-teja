import corsMiddleware from 'cors';
import { corsConfig } from "../config"

const cors = corsMiddleware({
  origin: corsConfig.origin,
  allowedHeaders: ['Authorization', "Content-Type", "X-CSRF-Token"],
  exposedHeaders: ['Authorization', "Content-Type", "X-CSRF-Token"],
  maxAge: corsConfig.maxAge,
})

// required for CORS configuration
export default cors