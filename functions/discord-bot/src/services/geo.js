import countryEmoji from 'country-emoji';

export class Geo {
  static async forward(location) {
    const params = new URLSearchParams({
      apiKey: process.env.GEOAPIFY_API_KEY,
      text: location,
    });

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      try {
        const json = await response.json();
        throw new Error(json.message);
      } catch (error) {
        throw new Error('Failed to get location: ' + response.statusText);
      }
    }

    const json = response.json();

    if (json.features.length < 1) {
      throw new Error('No location found');
    }

    const { properties } = json.features[0];
    const countryCode = properties['country_code'];

    return {
      flag: countryEmoji.flag(countryCode) || '',
      countryCode,
      location: city,
      timeZone: properties.timezone.name,
    };
  }
}
