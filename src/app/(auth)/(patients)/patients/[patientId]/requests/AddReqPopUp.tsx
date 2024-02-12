"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Button,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";

import { FiFilePlus } from "react-icons/fi";
import CreateRequest from "./CreateRequest";
import { usePatient } from "@/Contexts/PatientContext";
export default function AddReqPopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const patient = usePatient();

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <FiFilePlus size={25} /> Nouvelle Demande
      </Button>
      <Modal
        isOpen={isOpen}
        placement="auto"
        onOpenChange={onOpenChange}
        className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nouvelle Ville
              </ModalHeader>
              <ModalBody>
                <CreateRequest data={patient} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
