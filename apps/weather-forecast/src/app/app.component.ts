import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherForecastApiService, Coordinates, WeatherData } from '@bp/weather-forecast/services';
import { select, Store } from '@ngrx/store';
import { selectCityList } from './store/selectors/cities.selector';
import { IAppState } from './store/states/app.state';
import { AddCity } from './store/actions/cities.action';

@Component({
	selector: 'bp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	selectedCities$ = this._store.pipe(select(selectCityList));
	searchData: Coordinates[] = [];
	searchQuery: string = '';
	searchActive: boolean = false;
	queryDateType: number = 1;
	selectedCityWeatherMode: any = [];

	constructor(
		private _service: WeatherForecastApiService,
		private _store: Store<IAppState>,
		private _router: Router,
		private _route: ActivatedRoute
	) { }

	ngOnInit(): void {
		let value = this._route.snapshot.queryParamMap.get('query') || '';
		if (value) {
			this.onSearch(value);
		}
	}
	getTimeFormat(dt: number) {
		let date = new Date(dt * 1000);
		let hours = date.getHours();
		let minutes = "0" + date.getMinutes();
		let formattedTime = hours + ':' + minutes.substr(-2)
		return formattedTime
	}

	getDateFormat() {
		let now = Date.now()
		let date = new Date(now)

		const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Octr", "Nov", "Dec"];

		let weekday = date.getDay()
		let day = date.getDate()
		let month = date.getMonth()

		let daysData = [];

		for (let i = 0; i < days.length; i++) {
			if (weekday + i == 6) {
				weekday = 0
			}
			let formattedDate = days[weekday + i] + "," + months[month] + "," + (day + i)
			daysData.push(formattedDate);
		}
		return daysData
	}

	onSearch(val: string) {
		if (!val.length) {
			this.searchActive = false;
			this.searchData = [];
		} else {
			this.searchActive = true;
			this._service.GetCoordinates(val).subscribe(response => {
				this.searchData = response;
				this.addToTable(response[0])
			})
		}
		this._router.navigate([], { queryParams: { query: val, mode: this.queryDateType } });
	}

	async addToTable(data: Coordinates) {
		let exclude = ['current', 'minutely', 'hourly', 'alerts'];
		if (this.queryDateType === 2) {
			exclude = ['current', 'minutely', 'daily', 'alerts']
		}
		await this._service.GetWeatherData(data.lat, data.lon, exclude).subscribe((response: WeatherData) => {
			let responseData = response;
			let value = this._route.snapshot.queryParamMap.get('mode') || '';
			responseData.name = data.state ? `${data.name} (${data.state})` : data.name;
			this._store.dispatch(new AddCity(responseData))

			if (Number(value) == 1) {
				this.selectedCityWeatherMode = response.daily?.slice(0, 7)
			}
			else if (Number(value) == 2) {
				let hourlyData = []
				for (let i = 0; i < response.hourly?.length; i += 3) {
					hourlyData.push(response.hourly[i]);
				}
				this.selectedCityWeatherMode = hourlyData.slice(0, 8);
			}
		})
	}
	
	resetData() {
		this.selectedCityWeatherMode = []
		this.searchActive = false;
	}
}
