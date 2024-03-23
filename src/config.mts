import { genericObjectValidator } from './util.mjs'

const cfg = {
  FILES_LOCATION: process.env.FILES_LOCATION!,
  SECRET_PASSWORD: process.env.SECRET_PASSWORD!
}

genericObjectValidator(cfg)

export default cfg
