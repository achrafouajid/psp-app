"use client";
import React from "react";
import { DatePicker } from "@gsebdev/react-simple-datepicker";
import Button from "@/components/Button";
import { useStateContext } from "@/Contexts/ThemeContext";

export default function AddPatient() {
  const { currentColor } = useStateContext();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <div className="max-w-lg w-full mx-4">
        <form className="w-full max-w-lg bg-[#0c545c] border border-[#f17c34] rounded-lg p-8">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nom
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
              <p className="text-red-500 text-xs italic">
                Veuillez remplir ce champ.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Prénom
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Date de naissance
              </label>
              <DatePicker
                id="datepicker-id"
                name="date-demo"
                value={"01/02/2023"}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Ville
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Casablanca"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                Pays
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option>Maroc</option>
                  <option>Missouri</option>
                  <option>Texas</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className=" mb-6 ">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Programme
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>PSP</option>
                <option>PAP</option>
                <option>DAP</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              Code Postal
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
          <div className=" mb-6">
            <label
              className="block uppercase tracking-wide text-[#f17c34] text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Notes
            </label>
            <div className="relative">
              <textarea className=" rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"></textarea>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick=""
              color="white"
              bgColor={currentColor}
              text="Soummettre"
              borderRadius="10px"
              width="50px"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
