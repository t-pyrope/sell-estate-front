import http from '../http-common';

class EstatesDataService {
    createEstate(data){
        return http.put("/", data)
    }
}

export default new EstatesDataService();
