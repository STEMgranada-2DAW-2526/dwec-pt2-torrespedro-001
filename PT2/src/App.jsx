import { ProveedorJuego } from "./GameProvider";
import Juego from "./Juego";

export default function App() {
  return (
    <ProveedorJuego>
      <Juego />
    </ProveedorJuego>
  );
}