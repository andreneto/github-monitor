import axios from 'axios';
import { getCSRFToken } from '../../utils/csrf';

const APIClient = axios.create();
APIClient.defaults.headers['X-CSRFToken'] = getCSRFToken();

const listCommits = ({ page = 1, repositoryId = '', authorId = '' }) =>
  APIClient.get('api/commits/', {
    params: { repository: repositoryId, author: authorId, page },
  });

const getCommit = (id) => APIClient.get(`api/commits/${id}/`);

export default {
  listCommits,
  getCommit,
};
