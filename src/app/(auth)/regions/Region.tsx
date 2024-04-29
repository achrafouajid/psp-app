"use client";
import React, { useState } from "react";
import getAllRegions from "../../../../server/region/getAllRegions";
import AddCityPopUp from "./AddCityPopUp";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import remove_city from "../../../../server/region/remove_city";
import { TiDelete } from "react-icons/ti";
import remove_region from "../../../../server/region/remove_region";
import { FiEdit } from "react-icons/fi";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function Region(
  region: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>[number]
) {
  const [isDisabled, setisDisabled] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isCityDeleteModalOpen, setIsCityDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleDeleteCity = (city: { id: string; name: string }) => {
    setCityToDelete(city);
    setIsCityDeleteModalOpen(true);
  };

  const handleConfirmCityDeletion = () => {
    // Ensure cityToDelete is not null before deletion
    if (cityToDelete) {
      remove_city(cityToDelete.id);
    }
    setCityToDelete(null);
    setIsCityDeleteModalOpen(false);
  };

  const handleDeleteRegion = () => {
    remove_region(region.id);
    onOpenChange(); // Close the modal after deletion
  };
  return (
    <ul
      className="border border-[#396EA5] rounded-3xl mt-5 p-4 max-w-sm"
      key={region.name}
    >
      <div className="flex justify-between items-center">
        <p className="text-xl font-medium text-[#396EA5] gap-1 flex items-center mx-2">
          <FaMapMarkerAlt />
          {region.name}
          {!isDisabled && (
            <Button
              onClick={onOpen}
              isIconOnly
              color="danger"
              variant="bordered"
            >
              <TiDelete size={25} style={{ color: "red" }} />
            </Button>
          )}
        </p>
        {isDisabled && (
          <Button
            onClick={() => setisDisabled(!isDisabled)}
            isIconOnly
            color="primary"
            variant="faded"
            aria-label="Envoyer récupération..."
          >
            <FiEdit size={25} />
          </Button>
        )}
        {!isDisabled && <AddCityPopUp regionId={region.id} />}
      </div>
      <div className="flex h-full flex-col">
        {region.city.map((city) => (
          <li className="flex items-center">
            <GoDotFill style={{ color: "#396EA5" }} />
            {city.name}
            {!isDisabled && (
              <button
                onClick={() => handleDeleteCity(city)}
                className="text-red-500 hover:text-red-700"
              >
                <TiDelete />
              </button>
            )}
          </li>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Supprimer une région</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer la région "{region.name}" ?
            Toutes les villes correspondantes seront supprimées. Cette action
            est irréversible.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" variant="light" onPress={onOpenChange}>
              Annuler
            </Button>
            <Button color="danger" onPress={handleDeleteRegion}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isCityDeleteModalOpen}
        onOpenChange={() => setIsCityDeleteModalOpen(false)}
      >
        <ModalContent>
          <ModalHeader>Supprimer une ville</ModalHeader>
          <ModalBody>
            Êtes-vous sûr de vouloir supprimer la ville "{cityToDelete?.name}" ?
            Cette action est irréversible.
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              variant="light"
              onPress={() => setIsCityDeleteModalOpen(false)}
            >
              Annuler
            </Button>
            <Button color="danger" onPress={handleConfirmCityDeletion}>
              Supprimer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ul>
  );
}
