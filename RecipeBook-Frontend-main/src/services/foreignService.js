import httpService from "./httpService.js";
//import config from "../config.json";


export function getForeigns() {
    return httpService.get(`${'/api'}/foreigns`);
}

export function getForeign(id) {
    return httpService.get(`${'/api'}/foreigns/${id}`);
}

export function saveForeign(data) {
    return httpService.post(`${'/api'}/foreigns`, data)
    //.then( () => console.log('success'))
    //.catch( e => console.log(e));
}

export function updateForeign(data, id) {
    return httpService.put(`${'/api'}/foreigns/${id}`, data);
}

export function deleteForeign(id) {
    return httpService.delete(`${'/api'}/foreigns/${id}`);
}