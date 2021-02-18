import axios from 'axios';
import { getCSRFToken } from '../../utils/csrf';
import { getBaseURL } from '../../utils/api';

const APIClient = axios.create({
  baseURL: getBaseURL(),
});
APIClient.defaults.headers['X-CSRFToken'] = getCSRFToken();

const listCommits = ({ page = 1, repositoryId = '', authorEmail = '' }) =>
  APIClient.get('api/commits/', {
    params: { repository: repositoryId, author_email: authorEmail, page },
  });

const getCommit = (id) => APIClient.get(`api/commits/${id}/`);

export default {
  listCommits,
  getCommit,
};
