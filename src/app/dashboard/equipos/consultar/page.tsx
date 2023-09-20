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
