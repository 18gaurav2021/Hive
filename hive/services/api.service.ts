import axios from 'axios';
import { InterceptorService } from './interceptor.service';
import { ExceptionService } from './exception.service';

export class ApiService {
  private interceptor = new InterceptorService();
  private exceptionHandler = new ExceptionService();

  constructor() {
    this.interceptor.applyInterceptors();
  }

  async fetchData(endpoint: string): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchCountry(endpoint: string): Promise<any> {
    try {
      const url = `http://20.207.68.38${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchstate(endpoint: string): Promise<any> {
    try {
      const url = `http://20.207.68.38${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async fetchvendorlist(endpoint: string): Promise<any> {
    try {
      const url = `http://20.219.172.254${endpoint}`;
      const response = await axios.get(url);

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async postDatawareHouse(endpoint: string, data: any): Promise<any> {
    try {
      const url = `http://20.207.68.38${endpoint}`;
      const response = await axios.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }

  async postData(endpoint: string, data: any): Promise<any> {
    try {
      const url = `${endpoint}`;
      const response = await axios.post(url, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
  async patchData(endpoint: string, data: any): Promise<any> {
    try {
      const response = await axios.patch(`${endpoint}`, data);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.data;
    } catch (error) {
      this.exceptionHandler.handle(error as Error);
      // You can re-throw the error or return a default value here
    }
  }
}

// export class ApiService1 {
//   private interceptor = new InterceptorService1();
//   private exceptionHandler = new ExceptionService();

//   constructor() {
//     this.interceptor.applyInterceptors();
//   }
// async patchData(endpoint: string, data: any): Promise<any> {
//   try {
//     const url = `http://20.192.10.19${endpoint}`;
//     const response = await axios.patch(url, data);
//     if (response.status < 200 || response.status >= 300) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return response.data;
//   } catch (error) {
//     this.exceptionHandler.handle(error as Error);
//     // You can re-throw the error or return a default value here
//   }
// }
// }
