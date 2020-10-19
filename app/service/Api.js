import axios from 'axios';
import apiConfig from '../config/apiConfig';
import DbRnRestMap from '../database/DbRnRestMap';

const client = (() => {
  return axios.create({
    baseURL: apiConfig.Base_url,
    timeout: 120000,
    timeoutErrorMessage: 'Please check your connection and Try again.'
  });
})();


const request = async function (options, isOfflineSupport = false) {
  console.log('request',options);

  if (isOfflineSupport) {

    const onSuccess = function (response) {
      if (isOfflineSupport) {
        const apiData = {
          url: options.url,
          response: JSON.stringify(response.data),
        }
       DbRnRestMap.insertApiData(apiData);
      }
        return response.data;
    }

    const onError = function (error) {
        return Promise.reject("");
    }

    return client(options)
      .then(onSuccess)
      .catch(onError);

  } else {
    if (isOfflineSupport) {
      return await DbRnRestMap.getApiData(options.url);
    } else {
      return Promise.reject("Please Check your network");
    }
  }

}

export default request;
