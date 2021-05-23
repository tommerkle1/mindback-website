import React, { useMemo } from "react";
import gql from "graphql-tag";
import moment from "moment-timezone";
import { Redirect, useParams } from "react-router-dom";

import DataManager from "./DataManager";
import { EditableCell, RowActions, TextCell } from "../components";

const userData = [
  {
    id: "069",
    sender: "+12062475036",
    tz: "mt",
  },
  {
    id: "420",
    sender: "+12089918389",
    tz: "mt",
  },
];

export default function IdeaManager() {
  const { userId } = useParams();

  const columns = useMemo(
    () => [
      {
        Header: "Actions",
        Cell: (props) => <RowActions {...props} />,
      },
      {
        Header: "Description",
        accessor: "description",
        disableSortBy: true,
        Cell: EditableCell,
      },
      {
        Header: "Created",
        accessor: "creation_date",
        Cell: ({ value, ...props }) => (
          <TextCell
            {...props}
            value={moment(value).format("MMMM Do YYYY h:mm a")}
          />
        ),
      },
      {
        Header: "Categories",
        accessor: "categories",
        disableSortBy: true,

        Cell: ({ value, ...props }) => (
          <TextCell {...props} value={value[0].name} />
        ),
      },
    ],
    []
  );

  const user = userData.find((u) => u.id === userId);

  if (!user) return <Redirect to="/" />;

  const { sender } = user;

  const GET_NOTES = gql`
    query getNotes {
      notes(query: { sender: "${sender}" }) {
        _id
        description
        categories {name}
        modified_date
        creation_date
      }
    }
  `;

  return <DataManager query={GET_NOTES} title="Notes" columns={columns} />;
}
