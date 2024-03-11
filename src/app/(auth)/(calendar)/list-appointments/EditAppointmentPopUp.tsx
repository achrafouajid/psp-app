"use client";
import React, { Suspense, use, useState } from "react";
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

import getAllDoctors from "../../../../../server/doctor/getAllDoctors";
import getAppointment from "../../../../../server/appointment/getAppointment";

import EditAppoForm from "./EditAppoForm";

export default function EditAppointmentPopUp({
  patients,
  doctors,
  appointment,
  isOpen,
  onOpenChange,
}: {
  patients: NonNullable<Awaited<ReturnType<typeof getAllPatients>>>;
  doctors: NonNullable<Awaited<ReturnType<typeof getAllDoctors>>>;
  appointment: NonNullable<Awaited<ReturnType<typeof getAppointment>>>;
  isOpen: boolean;
  onOpenChange: (event: boolean) => void;
}) {
  return (
    <div className="w-full mt-5">
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
                Modifier le rendez-vous
              </ModalHeader>
              <ModalBody>
                <EditAppoForm
                  patients={patients}
                  doctors={doctors}
                  appointment={appointment}
                  isOpen={isOpen}
                  onOpenChange={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  style={{ color: "#396EA5" }}
                  variant="light"
                  onPress={onClose}
                >
                  Fermer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
