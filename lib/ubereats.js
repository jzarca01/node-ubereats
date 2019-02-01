const axios = require('axios');

class UberEats {
  constructor({ latitude, longitude, formattedAddress }) {
    this.request = axios.create({
      baseURL: 'https://cn-geo1.uber.com/rt/eats',
      headers: {
        'Content-Type': 'application/json',
        'x-uber-target-location-latitude': latitude,
        'x-uber-target-location-longitude': longitude,
        'x-uber-token': '12345'
      }
    });
    this.address = {
      latitude,
      longitude,
      formattedAddress
    };
  }

  async getRestaurants() {
    try {
      const { latitude, longitude, formattedAddress } = this.address;
      const restaurants = await this.request({
        method: 'POST',
        url: 'v1/search/home',
        data: {
          supportedTypes: ['grid'],
          targetLocation: {
            address: {
              eaterFormattedAddress: formattedAddress
            },
            latitude: latitude,
            longitude: longitude
          }
        }
      });
      return restaurants.data;
    } catch (err) {
      console.log('error with getRestaurants', err);
    }
  }

  async searchRestaurants(searchQuery) {
    try {
      const { latitude, longitude, formattedAddress } = this.address;
      const restaurants = await this.request({
        method: 'POST',
        url: 'v2/search',
        data: {
          targetLocation: {
            address: {
              eaterFormattedAddress: formattedAddress
            },
            latitude: latitude,
            longitude: longitude
          },
          useRichTextMarkup: true,
          userQuery: searchQuery
        }
      });
      return restaurants.data;
    } catch (err) {
      console.log('error with searchRestaurants', err);
    }
  }

  async getStoreDetails(storeUuid) {
    try {
      const store = await this.request({
        method: 'GET',
        url: `/v2/stores/${storeUuid}`,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      return store.data;
    } catch (err) {
      console.log('error with getStoreDetails', err);
    }
  }
}

module.exports = UberEats;
