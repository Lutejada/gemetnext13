import { useState } from "react";

export const useModalDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClickOpenModal, setIsClickOpenModal] = useState(false);
  const clickDropdownItem = () => {
    setIsClickOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const detectDropdownClose = (value: boolean) => {
    if (isClickOpenModal && value === false) {
      setIsOpenModal(true);
    }
  };
  const onOpenChangeModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  return {
    isOpenModal,
    clickDropdownItem,
    closeModal,
    detectDropdownClose,
    onOpenChangeModal,
  };
};
