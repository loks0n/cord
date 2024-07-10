import { geocoder } from 'node-geocoder';
import tzdata from 'tzdata';
import countryEmoji from 'country-emoji';

export class Geo {
  static async getCityFlag(cityName) {
    try {
      const res = await geocoder.geocode(cityName);
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

  static async getCityTimezone(cityName) {
    try {
      const res = await geocoder.geocode(cityName);
      if (res.length > 0) {
        const { latitude, longitude } = res[0];
        const timezone = tzdata.getTimezoneFromCoordinates(latitude, longitude);
        return timezone || false;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}
