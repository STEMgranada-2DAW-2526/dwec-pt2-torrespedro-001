import { createContext, useReducer } from "react";

const Cantidad_Mejoras = 3;

const EstadoJuego = {
 dañoAcumulado: 0,
  dañoObjetivo: 100,
  caramelosSangrientos: 20,
  oleada: 1,
  disparosPorSegundo: 1,
  mejorasAutomaticas: 0,
  precioMultiplicador: 10,
  mejoras: {
    canionSangriento: false,
    renosLanzamisiles: false,
    arbolNavidadLaser: false,
  },
};

function calcularDanioMejoras(estado) {
  let total = 1;
  if (estado.mejoras.canon) total += 2;
  if (estado.mejoras.renos) total += 5;
  if (estado.mejoras.arbol) total += 10;
  return total;
}

function reductor(estado, accion) {
  if (accion.tipo === "DISPARAR") {
    if (estado.danioActual < estado.danioObjetivo && estado.caramelos > 0) {
      return {
        danioActual: estado.danioActual + calcularDanioMejoras(estado),
        danioObjetivo: estado.danioObjetivo,
        caramelos: estado.caramelos - 1,
        oleada: estado.oleada,
        mejoras: estado.mejoras,
      };
    }
    return estado;
  }

  if (accion.tipo === "AUTO_SHOOT") {
    if (estado.danioAcumulado < estado.danioObjetivo && estado.caramelos > 0) {
      return {
        danioAcumulado: estado.danioAcumulado + calcularDanioPorDisparo(estado) * estado.disparosPorSegundo,
        danioObjetivo: estado.danioObjetivo,
        caramelos: estado.caramelos - estado.disparosPorSegundo,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo,
        mejoras: estado.mejoras,
        mejorasAuto: estado.mejorasAuto,
        precioMultiplicador: estado.precioMultiplicador,
      };
    }
    return estado;
  }
  
