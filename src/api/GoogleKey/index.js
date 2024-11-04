/* eslint-disable */
import {
    GOOGLE_KEY_MANAGEMENT_ENDPOINT,
    UPDATE_GOOGLE_KEY_MANAGEMENT_ENDPOINT
} from './endpoints';
import ApiFactory from '../ApiFactory';

const GoogleKeyAPI = new ApiFactory({ url: process.env.REACT_APP_API_ENDPOINT });

GoogleKeyAPI.createEntities([
    { name: GOOGLE_KEY_MANAGEMENT_ENDPOINT},
    { name: UPDATE_GOOGLE_KEY_MANAGEMENT_ENDPOINT},
]);

const fetchListAllGoogleKeyAPI = (params) => GoogleKeyAPI.createBasicCRUDEndpoints({ name: GOOGLE_KEY_MANAGEMENT_ENDPOINT }).get(params);
 const createGoogleKeyAPI = (params) => GoogleKeyAPI.createBasicCRUDEndpoints({ name: GOOGLE_KEY_MANAGEMENT_ENDPOINT }).post(params);
 const detailGoogleKeyAPI = (id) => GoogleKeyAPI.createBasicCRUDEndpoints({ name: GOOGLE_KEY_MANAGEMENT_ENDPOINT }).getOne(id);
 const updateGoogleKeyAPI = (params) => GoogleKeyAPI.createBasicCRUDEndpoints({ name: UPDATE_GOOGLE_KEY_MANAGEMENT_ENDPOINT }).submitPut(params);
 const deleteGoogleKeyAPI = (id) => GoogleKeyAPI.createBasicCRUDEndpoints({ name: GOOGLE_KEY_MANAGEMENT_ENDPOINT }).delete(id);

export {
    fetchListAllGoogleKeyAPI,
    createGoogleKeyAPI,
    detailGoogleKeyAPI,
    updateGoogleKeyAPI,
    deleteGoogleKeyAPI
}
