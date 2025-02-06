import httpClient from "../modules/httpClient";

export const getSearchLocation = async (query: string) => {
  const url = `${process.env.CITIES_SEARCH_URL}?apikey=${process.env.ACCU_WEATHER_API_KEY}&q=${query}`;

  return await httpClient.get(url);
};

export const getAutocomplateSearch = async (query: string) => {
  const url = `${process.env.CITIES_AUTOCOMPLATE_URL}?apikey=${process.env.ACCU_WEATHER_API_KEY}&q=${query}`;

  return await httpClient.get(url);
};
