import httpService from "./httpService.js";
//import config from "../config.json";


export function getLocals() {
    return httpService.get(`${'/api'}/locals`);
}

export function getLocal(id) {
    return httpService.get(`${'/api'}/locals/${id}`);
}

export function saveLocal(data) {
    return httpService.post(`${'/api'}/locals`, data)
    //.then( () => console.log('success'))
    //.catch( e => console.log(e));
}

export function updateLocal(data, id) {
    return httpService.put(`${'/api'}/locals/${id}`, data);
}

export function deleteLocal(id) {
    return httpService.delete(`${'/api'}/locals/${id}`);
}