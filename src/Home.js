import React, { Component } from "react";
import { Text, Box } from "@chakra-ui/layout";

export default class Home extends Component {
  render() {
    return (
      <Box>
        <Text>mindback is an automation system designed for people.</Text>
        <Text>
          currently it is intended as a personal data management tool to
          collect, analyze, and then act on personal data.
        </Text>
        <Text>stay tuned for more updates.</Text>
      </Box>
    );
  }
}
