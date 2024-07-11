import countryEmoji from 'country-emoji';

export class Geo {
  static async forward(cityQuery) {
    const params = new URLSearchParams({
      apiKey: process.env.GEOAPIFY_API_KEY,
      text: cityQuery,
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

    const json = await response.json();

    if (json.features.length < 1) {
      throw new Error('No location found');
    }

    const { properties } = json.features[0];
    const countryCode = properties['country_code'];

    const timeZone = properties.timezone.name;
    const flag = countryEmoji.flag(countryCode) || '';
    const city =
      properties.city ||
      properties.county ||
      properties.state ||
      properties.country;

    if (city === undefined || !timeZone === undefined) {
      throw new Error(
        'Failed to find city. Properties: ' +
          JSON.stringify(properties) +
          '\n\n full response: ' +
          JSON.stringify(json)
      );
    }

    return {
      flag,
      timeZone,
      city,
    };
  }
}
