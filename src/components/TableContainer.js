// TableContainer.js
import React, { useMemo, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import { gql, useMutation } from "@apollo/client";

const TableContainer = ({
  columns,
  data,
  title,
  updateData,
  refetch,
  onUpdate,
}) => {
  const [editingRow, setEditingRow] = useState(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          sortBy: [
            {
              id: "created",
              desc: false,
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
                key={i}
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

const TableRow = ({ index, row, setEditingRow, editingRow, onUpdate }) => {
  const UPDATE_NOTE = gql`
    mutation updateOneNote($id: ObjectId, $description: String) {
      updateOneNote(query: { _id: $id }, set: { description: $description }) {
        _id
      }
    }
  `;

  const [rowData, setRowData] = useState(row.original);

  const [updateNote, { data }] = useMutation(UPDATE_NOTE);

  const editable = useMemo(
    () => row.original._id === editingRow,
    [row.original._id, editingRow]
  );
  return (
    <Tr key={index} {...row.getRowProps()}>
      {row.cells.map((cell) => {
        return (
          <Td {...cell.getCellProps()}>
            {cell.render("Cell", {
              editable,
              value: rowData[cell.column.id],
              setValue: (value) =>
                setRowData((rowData) => ({
                  ...rowData,
                  [cell.column.id]: value,
                })),
              updateData: () => {
                // updateNote({
                //   variables: {
                //     id: row.original._id,
                //     description: rowData.description,
                //   },
                // })

                onUpdate();
              },
              resetRowData: () => setRowData(row.original),
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
