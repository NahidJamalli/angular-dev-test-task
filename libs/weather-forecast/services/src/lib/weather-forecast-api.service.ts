import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinates, WeatherData } from './weather-forecast.dtos';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	private _apiUrl = 'http://api.openweathermap.org';

	constructor(private _httpClient: HttpClient) { }

	public GetCoordinates(cityName: string): Observable<Coordinates[]> {
		return this._httpClient.get<Coordinates[]>(`${this._apiUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`);
	}

	public GetWeatherData(lat: number, lon: number, exclude: string[]): Observable<WeatherData> {
		return this._httpClient.get<WeatherData>(`${this._apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclude.join()}&appid=${this._apiKey}`);
	}
}
