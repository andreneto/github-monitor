export const getCSRFToken = () =>
  document.getElementById('main').dataset.csrftoken;

export default getCSRFToken;
