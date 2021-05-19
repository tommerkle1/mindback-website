import React, { useMemo } from "react";
import gql from "graphql-tag";
import moment from "moment-timezone";
import { Container } from "reactstrap";

import DataManager from "./DataManager";

export default function IdeaManager({ user: { sender } }) {
  const query = gql`
    query getNotes {
      notes(query: { sender: "${sender}" }) {
        description
        categories {name}
        modified_date
        creation_date
      }
    }
  `;

  const columns = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        disableSortBy: true,
        Cell: ({ value }) => <div style={{ textAlign: "left" }}>{value}</div>,
      },
      {
        Header: "Created",
        accessor: "creation_date",
        Cell: ({ value }) => {
          return moment(value).tz("MT").format("MMMM Do YYYY h:mm a");
        },
      },
      {
        Header: "Categories",
        accessor: "categories",
        disableSortBy: true,

        Cell: ({ value }) => {
          return value[0].name;
        },
      },
    ],
    []
  );
  return (
    <Container style={{ marginTop: 40 }}>
      <DataManager query={query} title="Notes" columns={columns} />
    </Container>
  );
}
