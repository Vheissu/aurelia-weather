import { HttpClient } from 'aurelia-fetch-client';
import { inject, Lazy } from 'aurelia-framework';

@inject(Lazy.of(HttpClient))
export class Api {
  http;

  lat;
  lon;
  location;
  temp;
  tempLow;
  tempHigh;
  images = [];

  constructor(getHttpClient) {
    this.http = getHttpClient();
  }

  async getWeather(lat, lon, unit = 'c') {
    // https://developer.yahoo.com/weather/
    const req = await this.http.fetch(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(${lat}%2C${lon})%22)%20and%20u%3D%22${unit}%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`);
    const res = await req.json();

    return res.query.results.channel;
  }
}
