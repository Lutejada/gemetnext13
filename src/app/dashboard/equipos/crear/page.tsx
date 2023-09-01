"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrearEquiposBasicos from "./basicos";
import CrearDatosmetrologicos from "./metrologicos";
import CrearDatosComplementarios from "./complementarios";

export default function Equipo() {
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Equipo</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger  value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        <TabsContent value="basicos">
          <CrearEquiposBasicos />
        </TabsContent>
        <TabsContent value="metrologicos">
          <CrearDatosmetrologicos />
        </TabsContent>
        <TabsContent value="complementarios">
          <CrearDatosComplementarios />
        </TabsContent>
        
      </Tabs>
    </>
  );
}
