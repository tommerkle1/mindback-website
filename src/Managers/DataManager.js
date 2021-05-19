import { useQuery } from "@apollo/client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../TableContainer";

export default function DataManager({ query, title, columns }) {
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>encountered an error: {error.message}</div>;
  }

  return <TableContainer data={data.notes} columns={columns} />;
}
