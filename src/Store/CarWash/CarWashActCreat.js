import {
  REMOVE_ADDRESS,
  SET_ABOUT,
  SET_BOOKINGS,
  SET_CAR_TYPES,
  SET_NEWS,
  SET_PACKETS,
  SET_SERVICES,
  SET_SLIDER_PHOTOS,
  SET_SUB_PACKETS,
  SET_TIMES,
} from './CarWashActions.js'

export const setAbout = (address) => {
  return {
    type: SET_ABOUT,
    payload: address,
  }
}

export const setTimes = (times) => {
  return {
    type: SET_TIMES,
    payload: times,
  }
}

export const setCarTypes = (carTypes) => {
  return {
    type: SET_CAR_TYPES,
    payload: carTypes,
  }
}

export const setPackets = (packets) => {
  return {
    type: SET_PACKETS,
    payload: packets,
  }
}

export const setSubPackets = (subPackets) => {
  return {
    type: SET_SUB_PACKETS,
    payload: subPackets,
  }
}

export const setServices = (services) => {
  return {
    type: SET_SERVICES,
    payload: services,
  }
}
export const setBookings = (bookings) => {
  return {
    type: SET_BOOKINGS,
    payload: bookings,
  }
}
export const setNews = (news) => {
  return {
    type: SET_NEWS,
    payload: news,
  }
}

export const setSliderPhotos = (sliderPhotos) => {
  return {
    type: SET_SLIDER_PHOTOS,
    payload: sliderPhotos,
  }
}

export const removeAddress = (UID) => {
  return {
    type: REMOVE_ADDRESS,
    payload: UID,
  }
}
