import { fetchAdapter, OsmGeocoder } from '@spurreiter/geocoder';
//import { find } from 'geo-tz';
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

  /* async getCityTimezone(cityName) {
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

  async getCityTimezone(cityName) {
    return 'America/New_York';
  }
}
