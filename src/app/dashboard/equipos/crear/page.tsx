"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CrearEquiposBasicos from "./basicos";

export default function Equipo() {
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Crear Equipo</h2>
      <Tabs defaultValue="basicos">
        <TabsList>
          <TabsTrigger  value="basicos">Basicos</TabsTrigger>
          <TabsTrigger value="matrologicos">Metrologicos</TabsTrigger>
          <TabsTrigger value="complementarios">Complementarios</TabsTrigger>
        </TabsList>
        <TabsContent value="basicos">
          <CrearEquiposBasicos />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
