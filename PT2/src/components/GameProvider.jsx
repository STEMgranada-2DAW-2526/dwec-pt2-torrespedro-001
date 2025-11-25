import { createContext, useReducer } from "react";

const Cantidad_Mejoras = 3;

const EstadoJuego = {
 danioAcumulado: 0,
  danioObjetivo: 100,
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

    if (accion.nombre === "renosLanzamisiles" && !estado.mejoras.renosLanzamisiles && estado.caramelosSangrientos >= 30) {
      return {
        danioAcumulado: estado.danioAcumulado,
        danioObjetivo: estado.danioObjetivo,
        caramelosSangriento: estado.caramelosSangrientos - 30,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo,
        mejoras: { canonTurron: estado.mejoras.canonTurron, renosLanzamisiles: true, arbolNavidadLaser: estado.mejoras.arbolNavidadLaser },
        mejorasAuto: estado.mejorasAuto,
        precioMultiplicador: estado.precioMultiplicador,
      };
    }
    if (accion.nombre === "arbolNavidadLaser" && !estado.mejoras.arbolNavidadLaser && estado.caramelosSangrientos >= 50) {
      return {
        danioAcumulado: estado.danioAcumulado,
        danioObjetivo: estado.danioObjetivo,
        caramelosSangrientos: estado.caramelosSangrientos - 50,
        oleada: estado.oleada,
        disparosPorSegundo: estado.disparosPorSegundo,
        mejoras: { canonTurron: estado.mejoras.canonTurron, renos: estado.mejoras.renosLanzaMisiles, arbolNavidadLaser: true },
        mejorasAuto: estado.mejorasAuto,
        precioMultiplicador: estado.precioMultiplicador,
      };
    }
    return estado;
  }
  if (accion.tipo === "NEXT_WAVE") {
    return {
      danioAcumulado: 0,
      danioObjetivo: Math.floor(estado.danioObjetivo * 1.1),
      caramelosSangrientos: estado.caramelosSangrientos + 10,
      oleada: estado.oleada + 1,
      disparosPorSegundo: estado.disparosPorSegundo,
      mejoras: estado.mejoras,
      mejorasAuto: estado.mejorasAuto,
      precioMultiplicador: estado.precioMultiplicador,
    };
  }
  return estado;
}

export const ContextoJuego = createContext();

export function ProveedorJuego({ children }) {
  const [estado, dispatch] = useReducer(reductor, estadoInicial);
  return (
    <ContextoJuego.Provider value={{ estado, dispatch }}>
      {children}
    </ContextoJuego.Provider>
  );
}
