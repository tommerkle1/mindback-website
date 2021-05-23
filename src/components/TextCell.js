import React from "react";
import { Text } from "@chakra-ui/react";

const TextCell = ({ value, editable }) => {
  return (
    <Text
      fontSize="md"
      opacity={!editable ? 0.4 : 1}
      style={{ cursor: "default" }}
    >
      {value}
    </Text>
  );
};

export default TextCell;
