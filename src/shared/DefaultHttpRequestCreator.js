import axios from 'axios';
import {toast} from "react-toastify";

function createAxiosRequest() {
  const instance = axios.create({
    baseURL: "/api/v1/",
    headers: {'Content-Type': 'application/json', 'Accept': 'Application/json'}
  });
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if(error.response.status === 409 || error.response.status === 400) {
      let violationMessages = "";
      error.response.data.violations.map((violation, index) => {
        violationMessages += violation.message;
        violationMessages += "\n";
      });
      toast.error(`${error.response.data.error}: ${violationMessages}`);
    }
    if(error.response.status === 404) {
      toast.error("Element not found");
    }
    if(error.response.status === 500) {
      toast.error(`${error.response.data.error}: ${error.response.data.ticket}`);
    }
    return Promise.reject(error);
  });
  return instance;
}

export {createAxiosRequest};
