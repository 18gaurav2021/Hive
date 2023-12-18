import axios from 'axios';

export class InterceptorService {
  interceptHeaders() {
    return {
      'X-Custom-Header': 'SampleValue',
      'tenant': 'HC_1',
      'Content-Type': 'application/json',
    };
  }

  applyInterceptors() {
    axios.interceptors.request.use(config=> {
      // Ensure config.headers exists
      config.headers = config.headers || {};

      // Append custom headers
      Object.assign(config.headers, this.interceptHeaders());

      return config;
    }, error => {
      // Handle request error here
      return Promise.reject(error);
    });
  }
}

// export class InterceptorService1 {
//   interceptHeaders() {
//     return {
//       'X-Custom-Header': 'SampleValue',
//       'tenant': 'HC_1',
//       'Content-Type': 'multipart/form-data',
//     };
//   }

//   applyInterceptors() {
//     axios.interceptors.request.use(config=> {
//       // Ensure config.headers exists
//       config.headers = config.headers || {};

//       // Append custom headers
//       Object.assign(config.headers, this.interceptHeaders());

//       return config;
//     }, error => {
//       // Handle request error here
//       return Promise.reject(error);
//     });
//   }
// }