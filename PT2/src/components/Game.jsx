import { useContext, useEffect } from "react";
import { ContextoJuego } from "./GameProvider";

export default function Juego() {
  const { estado, dispatch } = useContext(ContextoJuego);

  useEffect(() => {
    const id = setInterval(() => {
      if (estado.disparosPorSegundo > 1 && estado.caramelosSangrientos > 0 && estado.danioAcumulado < estado.danioObjetivo) {
        dispatch({ tipo: "AUTO_SHOOT" });
      }
    }, 1000);
    return () => clearInterval(id);
  }, [estado.disparosPorSegundo, estado.caramelosSangrientos, estado.danioAcumulado, estado.danioObjetivo, dispatch]);

  return (
    <div>
      <div>
        Daño de oleada: {estado.danioAcumulado} / {estado.danioObjetivo}
      </div>
      <div>
        Caramelos sangrientos: {estado.caramelosSangrientos}
      </div>
      <div>
        Oleada: {estado.oleada}
      </div>
      <button
        onClick={() => dispatch({ tipo: "CLICK_SHOOT" })}
        disabled={estado.caramelosSangrientos <= 0 || estado.danioAcumulado >= estado.danioObjetivo}
      >
        DISPARAR
      </button>
      {estado.danioAcumulado >= estado.danioObjetivo && (
        <button onClick={() => dispatch({ tipo: "NEXT_WAVE" })}>
          Siguiente Oleada
        </button>
      )}
      <PanelMejoras estado={estado} dispatch={dispatch} />
    </div>
  );
}

function PanelMejoras({ estado, dispatch }) {
  return (
    <div>
      <div>
        <button
          disabled={estado.caramelosSangrientos < estado.precioMultiplicador}
          onClick={() => dispatch({ tipo: "BUY_MULTIPLIER" })}
        >
          Multiplicador de disparos automáticos: {estado.precioMultiplicador} caramelos
        </button>
      </div>
      <div>
        <button
          disabled={estado.mejoras.canonTurron || estado.caramelosSangrientos < 15}
          onClick={() => dispatch({ tipo: "BUY_DAMAGE_UPGRADE", nombre: "canonTurron" })}
        >
          Cañón de Turrón Explosivo +2 daño (15 caramelos)
        </button>
        <button
          disabled={estado.mejoras.renosLanzamisiles || estado.caramelosSangrientos < 30}
          onClick={() => dispatch({ tipo: "BUY_DAMAGE_UPGRADE", nombre: "renosLanzamisiles" })}
        >
          Renos-Lanzamisiles +5 daño (30 caramelos)
        </button>
        <button
          disabled={estado.mejoras.arbolNavidadLaser || estado.caramelosSangrientos < 50}
          onClick={() => dispatch({ tipo: "BUY_DAMAGE_UPGRADE", nombre: "arbolNavidadLaser" })}
        >
          Árbol de Navidad Láser +10 daño (50 caramelos)
        </button>
      </div>
    </div>
  );
}