export interface LocalNames { 
	[key: string]: string;
}

export interface Coordinates {
	name: string;
	local_names: LocalNames[];
	lat: number;
	lon: number;
	country: string;
	state?: string;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Rain {
    [key: string]: number;
}

export interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather[];
    pop: number;
    rain: Rain;
}

export interface WeatherData {
    name?: string;
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    hourly: Hourly[];
    daily: Hourly[];
}