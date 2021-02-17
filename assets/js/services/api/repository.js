import axios from 'axios';
import { getCSRFToken } from '../../utils/csrf';

const APIClient = axios.create();
APIClient.defaults.headers['X-CSRFToken'] = getCSRFToken();

const listRepositories = () => APIClient.get('api/repositories/');

const getRepository = (id) => APIClient.get(`api/repositories/${id}/`);

const addRepository = (fullName) =>
  APIClient.post('api/repositories/', { full_name: fullName });

const removeRepository = (id) => APIClient.delete(`api/repositories/${id}/`);

const listCommitsFromRepository = (repositoryId) =>
  APIClient.get(`api/repositories/${repositoryId}/commits/`);

export default {
  listRepositories,
  getRepository,
  addRepository,
  removeRepository,
  listCommitsFromRepository,
};
