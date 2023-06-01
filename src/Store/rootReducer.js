import { combineReducers } from 'redux'
import {
  default as about,
  default as carTypes,
  default as packets,
  default as services,
  default as subPackets,
  default as times,
} from './CarWash/CarWashReducer.js'

const rootReducer = combineReducers({
  about,
  times,
  carTypes,
  packets,
  subPackets,
  services,
})

export default rootReducer