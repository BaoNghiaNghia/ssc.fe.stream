/* eslint-disable */
import { 
    USER_PACKAGE_ENDPOINT,
    INFORMATION_PACKAGE_ENDPOINT,
    PREORDER_PACKAGE_ENDPOINT,
    ADMIN_CONFIRM_ENDPOINT,
    ADMIN_LIST_ENDPOINT
  } from './endpoints';
  import ApiFactory from '../ApiFactory';
  
  const UserPackageApi = new ApiFactory({url: process.env.REACT_APP_API_ENDPOINT });
  
  UserPackageApi.createEntities([
    { name: USER_PACKAGE_ENDPOINT },
    { name: INFORMATION_PACKAGE_ENDPOINT },
    { name: PREORDER_PACKAGE_ENDPOINT },
    { name: ADMIN_CONFIRM_ENDPOINT },
    { name: ADMIN_LIST_ENDPOINT }
  ]);
  
  const fetchListUserPackageApi = () => UserPackageApi.createBasicCRUDEndpoints({ name: USER_PACKAGE_ENDPOINT }).get();
  const createUserPackageApi = (data) => UserPackageApi.createBasicCRUDEndpoints({ name: USER_PACKAGE_ENDPOINT }).post(data);
  const preOrderUserPackageApi = (data) => UserPackageApi.createBasicCRUDEndpoints({ name: PREORDER_PACKAGE_ENDPOINT }).post(data);
  const fetchInfoUserPackageApi = (params) => UserPackageApi.createBasicCRUDEndpoints({ name: INFORMATION_PACKAGE_ENDPOINT }).get(params); 
  
  const fetchAdminListApi = (params) => UserPackageApi.createBasicCRUDEndpoints({ name: ADMIN_LIST_ENDPOINT }).get(params);
  const adminConfirmUserPackageApi = (data) => UserPackageApi.createBasicCRUDEndpoints({ name: ADMIN_CONFIRM_ENDPOINT }).submitPut(data)

  export {
    createUserPackageApi,
    preOrderUserPackageApi,
    adminConfirmUserPackageApi,
    fetchListUserPackageApi,
    fetchAdminListApi,
    fetchInfoUserPackageApi
  }
  