import {
  REMOVE_ADDRESS,
  SET_ABOUT,
  SET_CAR_TYPES,
  SET_PACKETS,
  SET_SERVICES,
  SET_SUB_PACKETS,
  SET_TIMES,
} from './CarWashActions.js'

const initialState = {
  about: [],
  times: [],
  carTypes: [],
  packets: [],
  subPackets: [],
  services: [],
}

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ABOUT:
      return {
        ...state,
        about: action.payload,
      }
      break

    case SET_TIMES:
      return {
        ...state,
        times: action.payload,
      }
      break

    case SET_CAR_TYPES:
      return {
        ...state,
        carTypes: action.payload,
      }
      break

    case SET_PACKETS:
      return {
        ...state,
        packets: action.payload,
      }
      break

    case SET_SUB_PACKETS:
      return {
        ...state,
        subPackets: action.payload,
      }
      break

    case SET_SERVICES:
      return {
        ...state,
        services: action.payload,
      }
      break

    case REMOVE_ADDRESS:
      return {
        ...state,
        address: state.address.filter(
          (inAddress) => inAddress.UID !== action.payload,
        ),
      }
      break

    default:
      return state
  }
}
