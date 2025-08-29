import { configureStore } from '@reduxjs/toolkit'
import  authViewSlice  from '../pages/Login/LoginSlice'
import { apislice } from './apislice';
import  headerSlice  from '../pages/Dashboard/Header/headerSlice';


export default configureStore({
  reducer: {
    [apislice.reducerPath]: apislice.reducer,
    authView:authViewSlice,
    userView:headerSlice
  },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apislice.middleware),
})
