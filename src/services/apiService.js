import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;

// Requirements
export const saveRequirementStep4 = (data) => {
  return apiClient.post('/requirements/s4', data);
};

export const getRequirementStep5 = () => {
  return apiClient.get('/requirements/s5');
};

export const updateRequirementStep6 = (data) => {
  return apiClient.put('/requirements/s6', data);
};

export const getRequirementStep7ByParticipantId = (participantId) => {
  return apiClient.get(`/requirements/s7/${participantId}`);
};

// Participant CRUD
export const createParticipant = (data) => {
  return apiClient.post('/crud/participant/save', data);
};

export const getParticipantById = (participantId) => {
  return apiClient.get(`/crud/participant/find/${participantId}`);
};

export const updateParticipant = (data) => {
  return apiClient.put('/crud/participant/update', data);
};

export const deleteParticipant = (participantId) => {
  return apiClient.delete(`/crud/participant/delete/${participantId}`);
};

export const getAllParticipants = () => {
  return apiClient.get('/crud/participant/find');
};

// Response CRUD
export const createResponse = (data) => {
  return apiClient.post('/crud/response/save', data);
};

export const getResponseById = (responseId) => {
  return apiClient.get(`/crud/response/find/${responseId}`);
};

export const getAllResponses = () => {
  return apiClient.get('/crud/response/find');
};

export const updateResponse = (data) => {
  return apiClient.put('/crud/response/update', data);
};

export const deleteResponse = (responseId) => {
  return apiClient.delete(`/crud/response/delete/${responseId}`);
}; 