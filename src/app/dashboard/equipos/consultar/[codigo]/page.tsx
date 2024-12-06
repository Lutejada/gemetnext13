"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useObtenerEquipoPorCodigo } from "../../../hooks/useEquipo";
import { useParams } from "next/navigation";
import EditarEquiposBasicos from "./basicos";
import { useEffect } from "react";
import Loading from "../../../loading";
import EditarDatosmetrologicos from "./metrologicos";
import EditarDatosComplementarios from "./complementarios";
export default function Equipo() {
  const params = useParams<{ codigo: string }>();
  const { obtener, equipo, isLoading } = useObtenerEquipoPorCodigo(params.codigo);
  useEffect(() => {
    obtener();
  }, []);
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Editar Equipo</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        {equipo === undefined ? (
          <p>Loading</p>
        ) : (
          <>
            <TabsContent value="basicos">
              <EditarEquiposBasicos equipo={equipo} />
            </TabsContent>
            <TabsContent value="metrologicos">
              <EditarDatosmetrologicos equipo={equipo} />
            </TabsContent>
            <TabsContent value="complementarios">
              <EditarDatosComplementarios equipo={equipo} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </>
  );
}
