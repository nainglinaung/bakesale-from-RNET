const url = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeal() {
    try {
      let response = await fetch(`${url}/api/deals`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchDealDetail(id) {
    try {
      let response = await fetch(`${url}/api/deals/${id}`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchDealSearchResult(searchText) {
    try {
      console.log('url', `${url}/api/deals?searchTerm=${searchText}`);
      let response = await fetch(`${url}/api/deals?searchTerm=${searchText}`);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
