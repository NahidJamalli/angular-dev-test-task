import { WeatherData } from '@bp/weather-forecast/services';

export interface ICitiesState {
    cities: WeatherData[]
}

export const initialCitiesState: ICitiesState = {
    cities: []
}