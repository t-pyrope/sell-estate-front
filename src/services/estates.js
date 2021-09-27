import http from '../http-common';

// when server is in MongoDB
// class EstatesDataService {
//     createEstate(data){
//         return http.put("lead", data)
//     }
// }

// when server is on local machine
class EstatesDataService {
    createEstate(data){
        return http.put("/", data)
    }
}

export default new EstatesDataService();
