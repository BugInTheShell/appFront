import { createSlice } from '@reduxjs/toolkit'

export const authViewSlice = createSlice({
  name: 'authView',
  initialState: {
    value: "Login", // Estado inicial
  },
  reducers: {
    setLogin: (state) => {
      state.value = "Login"
    },
    setRegister: (state) => {
      state.value = "Register"
    },
    setForgotPass: (state) => {
      state.value = "ForgotPass"
    },
    setView: (state, action) => {
      // Para cambiar dinámicamente con un string
      state.value = action.payload
    }
  },
})

// Exportar acciones
export const { setLogin, setRegister, setForgotPass, setView } = authViewSlice.actions

// Exportar reducer
export default authViewSlice.reducer
