import { find } from 'geo-tz';
import countryEmoji from 'country-emoji';

export class Geo {
  async forward(query) {
    const params = new URLSearchParams({
      api_key: process.env.GEOCODIFY_API_KEY,
      q: query,
    });

    const response = await fetch(
      `https://api.geocodify.com/v2/geocode?${params.toString()}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    return response.json();
  }

  async getCityFlag(cityName) {
    const { response } = await this.forward(cityName);
    const matches = response.features;

    if (matches.length > 0) {
      const countryCode = matches[0].properties.country_code;
      return countryEmoji.flag(countryCode) || '';
    }

    return '';
  }

  async getCityTimezone(cityName) {
    const { response } = await this.forward(cityName);
    const matches = response.features;

    if (matches.length > 0) {
      const latitude = matches[0].geometry.coordinates[1];
      const longitude = matches[0].geometry.coordinates[0];
      const timezone = find(latitude, longitude);

      if (timezone && timezone.length > 0) {
        return timezone[0];
      }
    }
    return false;
  }
}
