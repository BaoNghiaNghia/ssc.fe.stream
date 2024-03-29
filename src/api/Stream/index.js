/* eslint-disable */
import { 
  USER_STREAM_ENDPOINT,
  STREAMING_ENDPOINT,
  RESOLUTION_STREAMING_ENDPOINT,
  AGENT_SERVER_ENDPOINT,
  ADMIN_AGENT_SERVER__ENDPOINT,
  VIDEO_META_INFO_ENDPOINT,
  CANCEL_STREAMING_ENDPOINT,
  DELETE_STREAMING_ENDPOINT,
  PLAY_STREAMING_ENDPOINT,
  DASHBOARD_STATISTIC_ENDPOINT,
  RESET_AGENT_SERVER_ENDPOINT,
  RESET_ADMIN_AGENT_SERVER_ENDPOINT,
  ASSIGN_AGENT_SERVER_FOR_ENDPOINT,
  UNASSIGN_AGENT_SERVER_FOR_ENDPOINT,
  DASHBOARD_ADMIN_STATISTIC_ENDPOINT,
  ASSIGN_AGENT_SERVER_FOR_RESELLER,
  UNASSIGN_AGENT_SERVER_FOR_RESELLER
} from './endpoints';
import ApiFactory from '../ApiFactory';

const UserStreamApi = new ApiFactory({url: process.env.REACT_APP_API_ENDPOINT });

UserStreamApi.createEntities([
  { name: USER_STREAM_ENDPOINT },
  { name: STREAMING_ENDPOINT },
  { name: AGENT_SERVER_ENDPOINT },
  { name: ADMIN_AGENT_SERVER__ENDPOINT },
  { name: RESOLUTION_STREAMING_ENDPOINT },
  { name: VIDEO_META_INFO_ENDPOINT },
  { name: CANCEL_STREAMING_ENDPOINT },
  { name: DELETE_STREAMING_ENDPOINT },
  { name: PLAY_STREAMING_ENDPOINT },
  { name: DASHBOARD_STATISTIC_ENDPOINT },
  { name: DASHBOARD_ADMIN_STATISTIC_ENDPOINT },
  { name: RESET_AGENT_SERVER_ENDPOINT },
  { name: RESET_ADMIN_AGENT_SERVER_ENDPOINT },
  { name: ASSIGN_AGENT_SERVER_FOR_ENDPOINT },
  { name: UNASSIGN_AGENT_SERVER_FOR_ENDPOINT },
  { name: ASSIGN_AGENT_SERVER_FOR_RESELLER },
  { name: UNASSIGN_AGENT_SERVER_FOR_RESELLER }
]);

const fetchListUserStreamApi = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: USER_STREAM_ENDPOINT }).get(params);
const detailUserStreamApi = (stream_id) => UserStreamApi.createBasicCRUDEndpoints({ name: USER_STREAM_ENDPOINT }).getOne(stream_id);
const updateUserStream = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: USER_STREAM_ENDPOINT }).update(data);

const listStreamingApi = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: STREAMING_ENDPOINT }).get(params);
const createStreamingApi = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: STREAMING_ENDPOINT }).post(data);
const updateStreamingApi = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: STREAMING_ENDPOINT }).update(params);
const playStreamingApi = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: PLAY_STREAMING_ENDPOINT }).submitPost(params);

const cancelStreamingApi = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: CANCEL_STREAMING_ENDPOINT }).submitPut(data);
const deleteStreamingApi = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: DELETE_STREAMING_ENDPOINT }).submitDelete(data);

const fetchListAcceptedResolution = () => UserStreamApi.createBasicCRUDEndpoints({ name: RESOLUTION_STREAMING_ENDPOINT }).get();
const fetchVideoMETAInfoData = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: VIDEO_META_INFO_ENDPOINT }).get(params);

const createNewAgentServerStream = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: ADMIN_AGENT_SERVER__ENDPOINT }).post(data);
const updateAgentServerStream = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: ADMIN_AGENT_SERVER__ENDPOINT }).update(data);
const deleteAgentServerStream = (id) => UserStreamApi.createBasicCRUDEndpoints({ name: ADMIN_AGENT_SERVER__ENDPOINT }).delete(id);
const fetchListAdminAgentServerStream = (params) => UserStreamApi.createBasicCRUDEndpoints({ name: ADMIN_AGENT_SERVER__ENDPOINT }).get(params);
const resetAdminAgentServerStream = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: RESET_ADMIN_AGENT_SERVER_ENDPOINT }).submitPut(data);
const resetAgentServerStream = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: RESET_AGENT_SERVER_ENDPOINT }).submitPut(data);

const assignAgentServerForUser = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: ASSIGN_AGENT_SERVER_FOR_ENDPOINT }).submitPut(data);
const unAssignAgentServerForUser = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: UNASSIGN_AGENT_SERVER_FOR_ENDPOINT }).submitPut(data);

const assignAgentServerForReseller = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: ASSIGN_AGENT_SERVER_FOR_RESELLER }).submitPut(data);
const unassignAgentServerForReseller = (data) => UserStreamApi.createBasicCRUDEndpoints({ name: UNASSIGN_AGENT_SERVER_FOR_RESELLER }).submitPut(data);

const fetchListAgentServerOfUser = () => UserStreamApi.createBasicCRUDEndpoints({ name: AGENT_SERVER_ENDPOINT }).get();

const fetchDashboardStatisticsStreaming = () => UserStreamApi.createBasicCRUDEndpoints({ name: DASHBOARD_STATISTIC_ENDPOINT }).get();
const fetchDashboardAdminStatisticsStreaming = () => UserStreamApi.createBasicCRUDEndpoints({ name: DASHBOARD_ADMIN_STATISTIC_ENDPOINT }).get();

export {
    fetchListUserStreamApi,
    detailUserStreamApi,
    updateUserStream,
    listStreamingApi,
    createStreamingApi,
    createNewAgentServerStream,
    updateAgentServerStream,
    deleteAgentServerStream,
    fetchListAdminAgentServerStream,
    fetchListAgentServerOfUser,
    fetchListAcceptedResolution,
    fetchVideoMETAInfoData,
    cancelStreamingApi,
    deleteStreamingApi,
    updateStreamingApi,
    playStreamingApi,
    fetchDashboardStatisticsStreaming,
    fetchDashboardAdminStatisticsStreaming,
    resetAdminAgentServerStream,
    assignAgentServerForUser,
    unAssignAgentServerForUser,
    resetAgentServerStream,
    assignAgentServerForReseller,
    unassignAgentServerForReseller
}
