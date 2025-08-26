import { configureStore } from '@reduxjs/toolkit'
import  authViewSlice  from '../pages/Login/LoginSlice'
import { apislice } from './apislice';


export default configureStore({
  reducer: {
    [apislice.reducerPath]: apislice.reducer,
    authView:authViewSlice
  },
})
