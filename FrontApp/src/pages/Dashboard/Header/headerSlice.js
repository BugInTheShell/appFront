import { createSlice } from '@reduxjs/toolkit'

export const headerSlice = createSlice({
  name: 'userView',
  initialState: {
    value: "Archivos", 
  },
  reducers: {
    setInicio: (state) => {
      state.value = "Inicio"
    },
    setArchivos: (state) => {
      state.value = "Archivos"
    },
    setUsuarios: (state) => {
      state.value = "Usuarios"
    },
    setSharedMe: (state) => {
      state.value = "SharedMe"
    },
    setView: (state, action) => {
      state.value = action.payload
    }
  },
})

// Exportar acciones
export const { setInicio, setArchivos, setUsuarios, setView, setSharedMe } = headerSlice.actions

// Exportar reducer
export default headerSlice.reducer