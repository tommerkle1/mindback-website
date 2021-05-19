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
        }}
      ><div>mindback is an automation system designed for people.</div>
       <div>currently it is intended as a personal data management tool to collect, analyze, and then act on personal data.</div>
       <div>stay tuned for more updates.</div>
      </div>

    );
  }
}
