import EjecucionEquipos from './components/table';
export default function Programacion() {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-center mb-4 font-semibold">
          Listado Ejecucion Equipos
        </h2>
        <EjecucionEquipos/>
      </div>
    );
  }