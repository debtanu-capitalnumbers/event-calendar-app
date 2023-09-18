import http from "./http-api"

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/events"
// const resource = apiPath + "/noauth-events"

export const allEvents = () => http.get(resource)

export const createEvent = event => http.post(resource, event)

export const updateEvent = (id, event) => http.post(`${resource}/${id}`, event)

export const removeEvent = id => http.delete(`${resource}/${id}`)

export const activeEvent = (id, event) => http.patch(`${resource}/${id}/active`, event)