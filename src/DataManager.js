import React, { Component } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { description } from "commander";

export default function DataManager() {
  const { loading, error, data } = useQuery(gql`
    query getNotes {
      notes {
        description
      }
    }
  `);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>encountered an error: {error.message}</div>;
  }
  return (
    <>
      {data.notes.map(({ description }) => (
        <div>{description}</div>
      ))}
    </>
  );

  // render() {
  //   const { data, userId } = this.props;

  //   return data[userId].map((chartId, i) => (
  //     <MongoChart key={i} chartId={chartId} theme="dark" />
  //   ));
  // }
}

class MongoChart extends Component {
  render() {
    const { chartId, theme = "light", refresh = "60" } = this.props;
    return (
      <iframe
        title={chartId}
        style={{
          backgroundColor: theme === "light" ? "#FFFFFF" : "#21313C",
          border: "none",
          borderRadius: "2px",
          boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
          marginTop: 40,
          marginLeft: 20,
          marginRight: 20,
        }}
        width="640"
        height="480"
        src={`https://charts.mongodb.com/charts-dev-hpmvn/embed/charts?id=${chartId}&autoRefresh=${refresh}&theme=${theme}`}
      />
    );
  }
}
