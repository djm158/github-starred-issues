const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Authorization', 'token ' + process.env.REACT_APP_TOKEN);

const init = {
  method: 'GET',
  headers: headers,
  mode: 'cors',
  cache: 'default'
};

export default init