import { Api } from './api';

import { inject } from 'aurelia-framework';

@inject(Api)
export class App {
  // Fields for weather information
  lat;
  lon;
  description;
  location;
  temp;
  tempLow;
  tempHigh;

  loading = false;

  // Pass in API from above inject decorator
  constructor(api) {
    this.api = api;
  }

  // attached method is called when page is loaded and DOM is ready
  attached() {
    // We are loading, make the UI display loading text until we are ready
    this.loading = true;

    // Prompt the users browser to ask for permission to get their current location
		navigator.geolocation.getCurrentPosition(async (pos) => {
      // User has allow their location to be shared, get their latitude and longitude
			this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;

      // Make a request to our API service and pass the latitude and longitude
      const weather = await this.api.getWeather(this.lat, this.lon);

      // Get the city and region name
      this.location = `${weather.location.city}, ${weather.location.region}`;

      // Temperature value (either in Fahrenheit or Celsius)
      this.temp = weather.item.condition.temp;

      // Lowest predicted temperature for today
      this.tempLow = weather.item.forecast[0].low;

      // Highest predicted temperature for today
      this.tempHigh = weather.item.forecast[0].high;

      // Description of the weather (sunny, partly cloudy, etc)
      this.description = weather.item.condition.text;

      // Set loading to false
      this.loading = false;
		}, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);

      // Location could not be determined/user blocked attempt to get location so set loading to false
      this.loading = false;
    });
  }
}
