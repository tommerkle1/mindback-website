// TableContainer.js
import React, { useMemo, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
// import { gql, useMutation } from "@apollo/client";

const TableContainer = ({ columns, data, updateData, refetch, onUpdate }) => {
  const [editingRow, setEditingRow] = useState(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [
            {
              id: "creation_date",
              desc: true,
            },
          ],
        },
        updateData,
        refetch,
      },
      useSortBy
    );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <TriangleDownIcon aria-label="sorted descending" />
      ) : (
        <TriangleUpIcon aria-label="sorted ascending" />
      )
    ) : null;
  };

  return (
    // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
    // Feel free to use console.log()  This will help you better understand how react table works underhood.
    <Box borderWidth="1px" borderRadius="lg">
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {generateSortingIndicator(column)}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                key={row.original._id}
                row={row}
                setEditingRow={setEditingRow}
                editingRow={editingRow}
                prepareRow={prepareRow}
                onUpdate={onUpdate}
              />
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

const TableRow = ({ row, setEditingRow, editingRow, onUpdate }) => {
  // const UPDATE_NOTE = gql`
  //   mutation updateOneNote($id: ObjectId, $description: String) {
  //     updateOneNote(query: { _id: $id }, set: { description: $description }) {
  //       _id
  //     }
  //   }
  // `;

  const [updatedRowData, setUpdatedRowData] = useState({});

  const rowData = { ...row.original, ...updatedRowData };

  const rowId = row.original._id;

  const editable = useMemo(() => rowId === editingRow, [rowId, editingRow]);
  return (
    <Tr {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <Td {...cell.getCellProps()}>
            {cell.render("Cell", {
              editable,
              value: rowData[cell.column.id],
              setValue: (value) =>
                setUpdatedRowData((rowData) => ({
                  ...rowData,
                  [cell.column.id]: value,
                })),
              updateData: () => onUpdate({ id: rowId, data: updatedRowData }),
              resetRowData: () => setUpdatedRowData({}),
              setRowUneditable: () => setEditingRow(null),
              setRowEditable: () => setEditingRow(row.original._id),
            })}
          </Td>
        );
      })}
    </Tr>
  );
};

export default TableContainer;
