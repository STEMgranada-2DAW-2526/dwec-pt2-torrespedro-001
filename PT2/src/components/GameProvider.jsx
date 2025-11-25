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
    canionTurron: false,
    renosLanzamisiles: false,
    arbolNavidadLaser: false,
  },
};

function calcularDanioMejoras(estado) {
  let total = 1;
  if (estado.mejoras.canonTurron) total += 2;
  if (estado.mejoras.renosLanzamisiles) total += 5;
  if (estado.mejoras.arbolNavidadLaser) total += 10;
  return total;
}

function reductor(estado, accion) {
  if (accion.tipo === "DISPARAR") {
    if (estado.danioActual < estado.danioObjetivo && estado.caramelosSangrientos > 0) {
      return {
        danioActual: estado.danioActual + calcularDanioMejoras(estado),
        danioObjetivo: estado.danioObjetivo,
        caramelosSangrientos: estado.caramelosSangrientos - 1,
        oleada: estado.oleada,
        mejoras: estado.mejoras,
      };
    }
    return estado;
  }

  if (accion.tipo === "AUTO_SHOOT") {
    if (estado.danioAcumulado < estado.danioObjetivo && estado.caramelosSangrientos > 0) {
      return {
        danioAcumulado: estado.danioAcumulado + calcularDanioPorDisparo(estado) * estado.disparosPorSegundo,
        danioObjetivo: estado.danioObjetivo,
        caramelosSangrientos: estado.caramelosSangrientos - estado.disparosPorSegundo,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo,
        mejoras: estado.mejoras,
        mejorasAuto: estado.mejorasAuto,
        precioMultiplicador: estado.precioMultiplicador,
      };
    }
    return estado;
  }
  
  if (accion.tipo === "BUY_MULTIPLIER") {
    if (estado.caramelosSangrientos >= estado.precioMultiplicador) {
      return {
        danioAcumulado: estado.danioAcumulado,
        danioObjetivo: estado.danioObjetivo,
        caramelosSangrientos: estado.caramelosSangrientos - estado.precioMultiplicador,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo + 1,
        mejoras: estado.mejoras,
        mejorasAuto: estado.mejorasAuto + 1,
        precioMultiplicador: Math.floor(estado.precioMultiplicador * 1.2),
      };
    }
    return estado;
  }

  if (accion.tipo === "BUY_DAMAGE_UPGRADE") {
    if (accion.nombre === "canonTurron" && !estado.mejoras.canonSangriento && estado.caramelos >= 15) {
      return {
        danioAcumulado: estado.danioAcumulado,
        danioObjetivo: estado.danioObjetivo,
        caramelosSangrientos: estado.caramelosSangrientos - 15,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo,
        mejoras: { canonTurron: true, renosLanzamisiles: estado.mejoras.renosLanzamisiles, arbolNavidadLaser: estado.mejoras.arbolNavidadLaser },
        mejorasAuto: estado.mejorasAuto,
        precioMultiplicador: estado.precioMultiplicador,
      };
    }


