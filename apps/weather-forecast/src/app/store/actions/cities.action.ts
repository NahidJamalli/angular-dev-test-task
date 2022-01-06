import { Action } from "@ngrx/store";
import { WeatherData } from '@bp/weather-forecast/services';

export enum ECitiesActions {
    AddCity = '[City] Add City',
}


export class AddCity implements Action {
    public readonly type = ECitiesActions.AddCity;
    constructor(public payload: WeatherData) {}
}

export type CitiesActions = AddCity;