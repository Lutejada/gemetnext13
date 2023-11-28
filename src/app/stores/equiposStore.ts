import { create } from "zustand";
import { Equipo } from "../api/equipos/dominio";

interface State {
  equipos: Equipo[];
  addEquipos: (equipos: Equipo[]) => void;
}

export const useEquiposStore = create<State>()((set) => ({
  equipos: [],
  addEquipos: (equipos: Equipo[]) => {
    set({ equipos });
  },
}));
