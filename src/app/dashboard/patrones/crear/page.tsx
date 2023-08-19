"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrearPatronesBasicos from "./basicos";
import CrearDatosmetrologicos from "./metrologicos";

export default function Equipo() {
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Patron</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger  value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="metrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        <TabsContent value="basicos">
          <CrearPatronesBasicos />
        </TabsContent>
        <TabsContent value="metrologicos">
          <CrearDatosmetrologicos/>
        </TabsContent>
        
      </Tabs>
    </>
  );
}
