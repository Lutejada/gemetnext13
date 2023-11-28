"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { obtenerEquipoPorCodigo } from "../../../hooks/useEquipo";
import { useParams } from "next/navigation";
import EditarEquiposBasicos from "./basicos";
import { useEffect } from "react";
import Loading from "../../../loading";
export default function Equipo() {
  const params = useParams<{ codigo: string }>();
  const { obtener, equipo, isLoading } = obtenerEquipoPorCodigo(params.codigo);
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
        <TabsContent value="basicos">
          {equipo === undefined ? (
            <p>Loading</p>
          ) : (
            <EditarEquiposBasicos equipo={equipo} />
          )}
        </TabsContent>

        <TabsContent value="metrologicos"></TabsContent>
        <TabsContent value="complementarios"></TabsContent>
      </Tabs>
    </>
  );
}
