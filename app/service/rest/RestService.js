import apiService from "../ApiService";

export default {
async getRestList(apiName) {
    return apiService.get(apiName, true);
  }
}