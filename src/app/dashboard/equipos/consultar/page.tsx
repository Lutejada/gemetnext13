import { Equipo, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Equipo[]> {
  // Fetch data from your API here.
  return [
    {
      codigo: " 123",
      descripcion: "some descripcion",
      marca: "marca del equipo",
      responsable: "Andres Tejada",
    },
    {
      codigo: "578",
      descripcion: "some descripcion 2 ",
      marca: "marca del equipo 2 ",
      responsable: "Luis Tejada",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
