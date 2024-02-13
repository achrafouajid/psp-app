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
  RadioGroup,
  Radio,
  Input,
} from "@nextui-org/react";
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import { useFormik } from "formik";
import create_category from "../../../../../server/category/create-category";
import toast from "react-hot-toast";
import { CategoryEnum } from "../../../../../server/category/types";
import { FaTag } from "react-icons/fa";
import { MdOutlineFormatColorFill } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

export default function AddCatPopUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const change = (args: any) => {
    formik.setFieldValue("color", args.currentValue.hex);
  };

  const formik = useFormik({
    initialValues: {
      color: "",
      label: "",
    },
    onSubmit: async ({ color, label }) => {
      const res = await create_category(label, color);
      if (res == CategoryEnum.Exist)
        toast.error("Cette catégorie existe déjà !");
      else toast.success("Catégorie créée avec succès !");
    },
  });
  {
    /*const change = (args: any) => {
    document.getElementById("preview")!.style.backgroundColor =
      args.currentValue.hex;
  }*/
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        style={{ backgroundColor: "#396EA5", color: "white" }}
        onPress={onOpen}
      >
        <TbCategoryPlus size={25} /> Nouvelle Catégorie
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
              <ModalHeader className="flex flex-col gap-1 text-2xl text-[#396EA5]">
                Nouvelle Catégorie
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center items-center mb-3 flex-wrap">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="w-full max-w-sm"
                  >
                    <Input
                      isRequired={true}
                      onChange={formik.handleChange}
                      name="label"
                      value={formik.values.label}
                      disabled={formik.isSubmitting}
                      className="border border-[#396EA5] rounded-xl text-[#116272] mb-3"
                      type="text"
                      label="Nom de la catégorie"
                      aria-label="category"
                      endContent={
                        <FaTag
                          size={30}
                          className="text-2xl text-[#396EA5] pointer-events-none flex-shrink-0 "
                        />
                      }
                    />
                    <Input
                      isRequired={true}
                      onChange={formik.handleChange}
                      name="color"
                      disabled={formik.isSubmitting}
                      className="border border-[#396EA5] rounded-xl text-[#116272] mb-3"
                      value={formik.values.color}
                      type="text"
                      label="Code Couleur"
                      aria-label="color"
                      endContent={
                        <MdOutlineFormatColorFill
                          size={30}
                          className="text-2xl text-[#396EA5] pointer-events-none flex-shrink-0 "
                        />
                      }
                    />
                    <div className="flex flex-col items-center">
                      <ColorPickerComponent
                        value={formik.values.color}
                        modeSwitcher={false}
                        disabled={formik.isSubmitting}
                        inline
                        showButtons={false}
                        change={change}
                      />
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="bg-[#396EA5] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-lg uppercase hover:bg-[#3965a5] mt-3"
                      >
                        Créer
                      </Button>
                    </div>
                  </form>
                </div>
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
