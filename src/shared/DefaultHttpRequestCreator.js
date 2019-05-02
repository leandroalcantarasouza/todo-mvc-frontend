import axios from 'axios';
function createAxiosRequest() {
  return axios.create({
    baseURL: "/api/v1/",
    headers: {'Content-Type': 'application/json', 'Accept': 'Application/json'}
  });
}
export {createAxiosRequest};
