import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface Props {
  isCompleted: boolean;
  programacionEquipoId: string;
}

import { DialogWrapper } from "@/components/dialogWrapper";
import { FormEjecucionEquipo } from "./form";
import { useModal } from "@/app/dashboard/hooks/useModal";
import { useState } from "react";
export const DropDownMenuEjecucionEquipo = ({
  isCompleted,
  programacionEquipoId,
}: Props) => {
  const {
    isOpenModal,
    clickOpenModal,
    onOpenChangeModal,
    onOpenChange,
    closeModal,
  } = useModal();
  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={clickOpenModal} disabled={isCompleted}>
            Ejecutar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={onOpenChangeModal}
        title="Crear Proveedor"
        description="Ingresa la informacion solicitada"
      >
        <FormEjecucionEquipo
          closeModal={closeModal}
          programacionEquipoId={programacionEquipoId}
        />
      </DialogWrapper>
    </>
  );
};
