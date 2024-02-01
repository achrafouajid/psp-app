import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import getAllRegions from "../../../../server/region/getAllRegions";

export default function RegionTable(
  region: NonNullable<Awaited<ReturnType<typeof getAllRegions>>>[number]
) {
  const rows = region.city;

  const columns = [{ key: "name", label: "City Name" }];
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell>{getKeyValue(row, column.key)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
