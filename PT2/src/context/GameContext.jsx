import { createContext, useEffect, useReducer } from "react";

export const GameContext = createContext();

const EstadoJuego = {
  cantidadGalletas: 0,
  cantidadCursores: 0,
  multiplicadorDeClic: 1,
  cantidadAbuelas: 0,
  precioCursor: 15,
  precioMultiplicador: 50,
  precioAbuela: 100,
  incrementoPrecioMultiplicador: 1.2,
  incrementoPrecioCursor: 1.1,
  incrementoPrecioAbuela: 1.3,
  upgrates: [
    { id: 1, objetivo: 10, recompensa: 15, estado: "no disponible", progreso: 0 },
    { id: 2, objetivo: 50, recompensa: 80, estado: "no disponible", progreso: 0 },
    { id: 3, objetivo: 100, recompensa: 200, estado: "no disponible", progreso: 0 }
  ]
};