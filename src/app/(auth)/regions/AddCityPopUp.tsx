"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { CategoryEnum } from "../../../../server/category/types";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import createCity from "../../../../server/region/create_city";

export default function AddCityPopUp({ regionId }: { regionId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }: { name: string }) => {
      const res = await createCity(name, regionId);
      if (res == CategoryEnum.Exist) toast.error("Cette Ville existe déjà !");
      else toast.success("Ville créée avec succès !");
    },
  });

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        Créer Ville
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
              <form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
                <ModalBody>
                  <Input
                    isClearable
                    type="text"
                    label="Ville"
                    variant="bordered"
                    placeholder="Entrez la Ville"
                    defaultValue="Casablanca"
                    fullWidth
                    required
                    onChange={formik.handleChange}
                    name="name"
                    value={formik.values.name}
                    disabled={formik.isSubmitting}
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
                  <Button
                    style={{ backgroundColor: "#396EA5", color: "white" }}
                    onPress={onClose}
                    disabled={formik.isSubmitting}
                    type="submit"
                  >
                    Ajouter la Ville
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
