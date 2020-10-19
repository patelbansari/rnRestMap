import apiConfig from '../config/apiConfig';
import request from './Api'

const get = async function (apiName, isOfflineSupport = false) {
    return request({
        url: apiConfig.Base_url + apiName ,
        method: 'Get',

    },  isOfflineSupport);
}




const apiService = {
    get,
};

export default apiService;