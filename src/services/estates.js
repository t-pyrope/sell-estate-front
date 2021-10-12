import http from '../http-common';

// when server is in MongoDB
// class EstatesDataService {
//   // eslint-disable-next-line class-methods-use-this
//   createEstate(data) {
//     return http.put('lead', data);
//   }
// }

// when server is on local machine
class EstatesDataService {
  // eslint-disable-next-line class-methods-use-this
  createEstate(data) {
    return http.put('/', data);
  }
}

export default new EstatesDataService();
