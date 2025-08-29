/*En este archvivo se define la base para de RTKQ para hacer peticiones al back y
define los headers con las credenciales de autenticación*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { VITE_API_KEY, VITE_API_URL, VITE_ORIGIN_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers, { getState }) => {
    try {

      const res = localStorage.getItem("data");
      
      if (res) headers.set("api-key",res) 
        
    
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("User-Agent", "aboutadev");
      
      headers.set("Origin", VITE_ORIGIN_URL);

      return headers;
    } catch (err) {
      console.log("Error", err);

      return headers;
    }
  },
});

export const apislice = createApi({
  baseQuery,
  keepUnusedDataFor: 1,
  tagTypes: [
    "users",
    "files",
  ],
  endpoints: (builder) => ({}),
});