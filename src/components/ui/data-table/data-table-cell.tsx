import { CellContext } from "@tanstack/react-table";
import moment from "jalali-moment";

function DataTableIndexCell<T, V>({ row, table }: CellContext<T, V>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const count = pageIndex * pageSize;

  return row.index + count + 1;
}

function DataTableDateCell<T>({
  value,
  getValue,
  format = "jYYYY/jMM/jDD - HH:mm",
}: CellContext<T, unknown> & { format?: string; value?: any }) {
  const data = getValue() || value;

  if (typeof data == "number" || typeof data == "string") {
    return moment(data).locale("fa").locale("fa").format(format);
  }

  return <span className="text-gray-400">---</span>;
}

export { DataTableIndexCell, DataTableDateCell };
