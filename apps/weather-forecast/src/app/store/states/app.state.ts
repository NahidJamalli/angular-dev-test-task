import { RouterReducerState } from "@ngrx/router-store";
import { ICitiesState, initialCitiesState } from "./cities.state";

export interface IAppState {
    cities: ICitiesState,
    router?: RouterReducerState
}

export const initialAppState: IAppState = {
    cities: initialCitiesState
}

export function getInitialState(): IAppState {
    return initialAppState;
}