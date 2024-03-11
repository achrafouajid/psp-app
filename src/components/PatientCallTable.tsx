import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  ChipProps,
  Divider,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { AiOutlineMessage } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { getAllCallPatients } from "../../server/patient/getAllCallPatients";
import { useStateContext } from "@/Contexts/ThemeContext";

export default function PatientCallTable({
  callpatients,
}: {
  callpatients: Awaited<ReturnType<typeof getAllCallPatients>>;
}) {
  const { currentColor, currentMode } = useStateContext();
  const columns = [
    { name: "Patient", uid: "name" },
    { name: "No Téléphone", uid: "role" },
    { name: "Dernier status", uid: "status" },
    { name: "Action", uid: "actions" },
  ];

  const users = useMemo(() => {
    return callpatients.map((patient, index) => ({
      id: patient?.patient.patientno, // Assuming a simple sequential ID based on the index
      name: patient?.patient.firstName + " " + patient?.patient.lastName, // Assuming the patient object has firstName and lastName
      tel: patient?.patient.tel, // Assuming the patient object has a tel property
      status: patient?.patient.requests[0]?.statuses[0]?.status || "unknown", // Assuming the latest status is the first one
    }));
  }, [callpatients]);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    accepte: "success",
    refuse: "danger",
  };

  type User = (typeof users)[0];
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return <div>{user.name}</div>;
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.tel}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-[#396EA5] cursor-pointer active:opacity-50">
                <FaRegEye />
              </span>
            </Tooltip>
            <Tooltip content="Envoyer message">
              <span className="text-lg text-[#396EA5] cursor-pointer active:opacity-50">
                <AiOutlineMessage />
              </span>
            </Tooltip>
            <Tooltip content="Appeler">
              <span className="text-lg text-success cursor-pointer active:opacity-50">
                <IoCallOutline />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align="start"
            style={{ backgroundColor: currentColor, color: "white" }}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users}
        emptyContent={"Pas de patients à rappeler pour le moment ..."}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
