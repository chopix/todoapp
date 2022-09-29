import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from './reducers/AuthSlice'

const rootReducer = combineReducers({
   AuthReducer
})


export const setupStore = () => {
   return configureStore({
      reducer: rootReducer
   })
}

export type RootReducerState = ReturnType<typeof rootReducer>
export type SetupStore = ReturnType<typeof setupStore>
export type AppDispatch = SetupStore['dispatch']