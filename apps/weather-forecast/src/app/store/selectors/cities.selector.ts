import { createSelector } from "@ngrx/store";
import { IAppState } from "../states/app.state";
import { ICitiesState } from "../states/cities.state";

const selectCities = (state: IAppState) => state.cities;

export const selectCityList = createSelector(
    selectCities,
    (state: ICitiesState) => state.cities
)
