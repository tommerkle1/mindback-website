import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: 10 }}>
          mindback is an automation system designed for people.
        </div>
        <div style={{ margin: 10 }}>
          currently it is intended as a personal data management tool to
          collect, analyze, and then act on personal data.
        </div>
        <div style={{ margin: 10 }}>stay tuned for more updates.</div>
      </div>
    );
  }
}
