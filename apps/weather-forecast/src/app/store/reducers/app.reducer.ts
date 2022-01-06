import { ActionReducerMap } from "@ngrx/store";

import { routerReducer } from "@ngrx/router-store";
import { IAppState } from "../states/app.state";
import { citiesReducer } from "./cities.reducer";

export const appReducer: ActionReducerMap<IAppState, any> = {
    cities: citiesReducer,
    router: routerReducer
}
