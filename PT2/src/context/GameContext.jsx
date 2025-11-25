import { createContext, useEffect, useReducer } from "react";

export const GameContext = createContext();

const EstadoJuego = {

  cantidadCaramelosSangrientos: 0,
  cantidadCanionTurronExplosivo: 0,
  cantidadRenosLanzamisiles: 0,
  cantidadArbolNavidadLaser: 0,

  multiplicadorDeClic: 1,

  precioCanionTurronExplosivo: 15,
  precioRenosLanzamisiles: 30,
  precioArbolNavidadLaser: 50,

  incrementoPrecioMultiplicador: 1.2,
  incrementoPrecioCursor: 1.1,
  incrementoPrecioAbuela: 1.3,
  upgrates: [
    { id: 1, objetivo: 10, recompensa: 15, estado: "no disponible", progreso: 0 },
    { id: 2, objetivo: 50, recompensa: 80, estado: "no disponible", progreso: 0 },
    { id: 3, objetivo: 100, recompensa: 200, estado: "no disponible", progreso: 0 }
  ]
};

