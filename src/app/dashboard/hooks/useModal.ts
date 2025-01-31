import { useState } from "react";

export const useModal = () => {
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
  const onOpenChangeModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  return {
    isOpenModal,
    clickOpenModal,
    closeModal,
    onOpenChange,
    onOpenChangeModal,
  };
};
