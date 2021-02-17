import axios from 'axios';

const listRepositories = () => axios.get('api/repositories/');

const getRepository = (id) => axios.get(`api/repositories/${id}/`);

const addRepository = (fullName) =>
  axios.post('api/repositories/', { full_name: fullName });

const removeRepository = (id) => axios.delete(`api/repositories/${id}/`);

const listCommitsFromRepository = (repositoryId) =>
  axios.get(`api/repositories/${repositoryId}/commits/`);

export default {
  listRepositories,
  getRepository,
  addRepository,
  removeRepository,
  listCommitsFromRepository,
};
