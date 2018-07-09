import { Api } from './api';

import { inject } from 'aurelia-framework';

@inject(Api)
export class App {
  lat;
  lon;
  description;
  location;
  temp;
  tempLow;
  tempHigh;
  images = [];

  loading = false;

  constructor(api) {
    this.api = api;
  }

  attached() {
    this.loading = true;

		navigator.geolocation.getCurrentPosition(async (pos) => {
			this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;

      const weather = await this.api.getWeather(this.lat, this.lon);

      this.location = `${weather.location.city}, ${weather.location.region}`;
      this.temp = weather.item.condition.temp;
      this.tempLow = weather.item.forecast[0].low;
      this.tempHigh = weather.item.forecast[0].high;
      this.description = weather.item.condition.text;

      this.loading = false;

      console.log(weather);
		});
  }
}
