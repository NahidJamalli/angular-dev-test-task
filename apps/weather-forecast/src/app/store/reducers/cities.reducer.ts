import { ECitiesActions, CitiesActions } from "../actions/cities.action";
import { initialCitiesState, ICitiesState } from "../states/cities.state";

export const citiesReducer = (
    state = initialCitiesState,
    action: CitiesActions
): ICitiesState => {
    switch (action.type) {
        case ECitiesActions.AddCity: {
            return {
                ...state, 
                cities: state.cities.concat(action.payload)
            }   
        }
        default:
            return state;
    }
}