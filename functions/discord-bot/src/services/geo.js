import countryEmoji from 'country-emoji';

export class Geo {
  static async forward(cityQuery) {
    const params = new URLSearchParams({
      apiKey: process.env.GEOAPIFY_API_KEY,
      text: cityQuery,
      format: 'json',
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

    const body = await response.json();
    if (!body.results || body.results.length < 1) {
      throw new Error('No city found');
    }

    const result = body.results[0];

    const timeZone = result.timezone.name;
    const flag = countryEmoji.flag(result['country_code']) || '';
    const city = result.city || result.county || result.state || result.country;

    if (!city || !timeZone) {
      throw new Error(
        'Failed to find city. Top result: ' +
          JSON.stringify(result) +
          '\n\n full response: ' +
          JSON.stringify(body)
      );
    }

    return {
      flag,
      timeZone,
      city,
    };
  }
}
