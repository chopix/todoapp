import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "..";
import IUser from "../../types/IUser";

interface IAuthState {
   user: IUser | object,
   accessToken: string,
   refreshToken: string,
   isAuth: boolean,
}

const initialState: IAuthState = {
   user: {},
   accessToken: '',
   refreshToken: '',
   isAuth: false,
}



export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUserInfo(state, action: PayloadAction<object>) {
         state.user = action.payload
      },
      setAccessToken(state, action: PayloadAction<string>) {
         state.accessToken = action.payload
      },
      setRefreshToken(state, action: PayloadAction<string>) {
         state.refreshToken = action.payload
      },
      setAuth(state, action: PayloadAction<boolean>) {
         state.isAuth = action.payload
      }
   }
})

export default authSlice.reducer