import http from "./http-api"

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/events"

export const allEvents = params => http.get(`${resource}/${params}`)

export const createEvent = event => http.post(resource, event)

export const exportEvent = event => http.post(`${resource}/export/file`, event)

export const showEvent = id => http.get(`${resource}/${id}`)

export const updateEvent = (id, event) => http.post(`${resource}/${id}`, event)

export const removeEvent = id => http.delete(`${resource}/${id}`)

export const activeEvent = (id, event) => http.patch(`${resource}/${id}/active`, event)