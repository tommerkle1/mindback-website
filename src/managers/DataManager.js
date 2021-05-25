import { useQuery } from "@apollo/client";
import React from "react";
import { Spinner, Text, Box, useToast } from "@chakra-ui/react";

import { TableContainer } from "../components";

export default function DataManager({ query, title, columns }) {
  const { loading, error, data, refetch: requery } = useQuery(query);
  const toast = useToast();

  const refetch = () => {
    console.log("requerying");
    requery();
  };

  if (loading) {
    return <Spinner justifySelf="center" />;
  }
  if (error) {
    return <Text>encountered an error: {error.message}</Text>;
  }
  return (
    <Box>
      <TableContainer
        data={data.notes}
        columns={columns}
        refetch={refetch}
        onUpdate={({ id, data }) =>
          toast({
            title: "Idea Updated",
            description: `Row: ${id}, has been updated to include: ${JSON.stringify(
              data
            )}`,
            status: "success",
            duration: 1800,
            isClosable: true,
          })
        }
      />
    </Box>
  );
}
