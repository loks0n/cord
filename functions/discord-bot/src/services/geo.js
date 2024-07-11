import { fetchAdapter, OsmGeocoder } from '@spurreiter/geocoder';
// import tzdata from 'tzdata';
import countryEmoji from 'country-emoji';

export class Geo {
  constructor() {
    const adapter = fetchAdapter();
    this.geocoder = new OsmGeocoder(adapter, { language: 'en', limit: 5 });
  }

  async getCityFlag(cityName) {
    try {
      const res = await this.geocoder.forward(cityName);
      if (res.length > 0) {
        const countryCode = res[0].countryCode;
        return countryEmoji.flag(countryCode) || '';
      }
      return '';
    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  }

  async getCityTimezone(cityName) {
    /*
    try {
      const res = await this.geocoder.forward(cityName);
      if (res.length > 0) {
        const { latitude, longitude } = res[0];
        const timezone = tzdata.getTimezoneFromCoordinates(latitude, longitude);
        return timezone || false;
      }
      return false;
    } catch (error) {
      return false;
    }*/

    return 'America/New_York';
  }
}
