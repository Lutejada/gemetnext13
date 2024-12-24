import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";

export const DropdownMenuActions = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClickOpenModal, setIsClickOpenModal] = useState(false);
  const clickOpenModal = () => {
    setIsClickOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const onOpenChange = (value: boolean) => {
    if (isClickOpenModal && value === false) {
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
          <DropdownMenuItem onClick={clickOpenModal}>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
