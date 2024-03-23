import {
  ERR_CONFIG,
  ERR_CONFIG_VALUE_EMPTY,
  ERR_CONFIG_VALUE_NULL,
  ERR_CONFIG_VALUE_UNDEF
} from './constants/error-messages.mjs'

/**
 * Checks if values in the object are not undefined, null, contain an empty string or is equal to -1
 * @param obj 
 * @returns Validated object
 */
export function genericObjectValidator(obj: GenericObj): GenericObj {
  const errorsArray: string[] = []
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined) {
      errorsArray.push(` ${key}${ERR_CONFIG_VALUE_UNDEF}`)
      continue
    }
    if (val === null) {
      errorsArray.push(` ${key}${ERR_CONFIG_VALUE_NULL}`)
      continue
    }
    if (val.length !== undefined && val.length === 0) {
      errorsArray.push(` ${key}${ERR_CONFIG_VALUE_EMPTY}`)
      continue
    }
  }
  if (errorsArray.length !== 0) {
    throw new Error(ERR_CONFIG + errorsArray)
  }
  return obj
}

type GenericObj = {
  [key: string]: any
}
