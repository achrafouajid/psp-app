"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { FiFileText } from "react-icons/fi";
import getAllPatients from "../../../../../server/patient/getAllpatients";
import { useRouter } from "next/navigation";

export default function PatientListPopUp({
  patients,
}: {
  patients: NonNullable<Awaited<ReturnType<typeof getAllPatients>>>;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [selectedPatientId, setSelectedPatientId] = useState("");

  return (
    <div className="w-full mt-5">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <FiFileText />+ Demande
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
                Choisir le patient :
              </ModalHeader>
              <ModalBody>
                <Select
                  items={patients}
                  label="Patients"
                  placeholder="Choisissez un patient"
                  onChange={(event) => setSelectedPatientId(event.target.value)}
                  value={selectedPatientId}
                >
                  {(patient) => (
                    <SelectItem value={patient.id} key={patient.id}>
                      {patient.lastName.concat(" ", patient.firstName)}
                    </SelectItem>
                  )}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ color: "#396EA5" }}
                  variant="light"
                  onPress={onClose}
                >
                  Fermer
                </Button>
                <Button
                  style={{ backgroundColor: "#396EA5", color: "white" }}
                  onPress={onClose}
                  onClick={() => {
                    router.push(
                      `/patients/${selectedPatientId}/requests/add-request`
                    );
                  }}
                >
                  Valider
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
