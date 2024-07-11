//import { fetchAdapter, OsmGeocoder } from '@spurreiter/geocoder';
import { find } from 'geo-tz';
//import countryEmoji from 'country-emoji';

export class Geo {
  async getCityFlag(cityName) {
    return '🇺🇸';
    /*
    const adapter = fetchAdapter();
    const geocoder = new OsmGeocoder(adapter, { language: 'en', limit: 5 });
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
    } */
  }

  async getCityTimezone(cityName) {
    return find(40.7128, -74.0060);
    /*
    try {
      const res = await this.geocoder.forward(cityName);
      if (res.length > 0) {
        const { latitude, longitude } = res[0];
        const timezone = find(latitude, longitude);

        if (timezone && timezone.length > 0) {
          return timezone[0];
        }
      }
      return false;
    } catch (error) {
      return false;
    }
  } */
}
