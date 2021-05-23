import React from "react";
import { Flex } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

const RowActions = ({
  editable,
  setRowEditable,
  setRowUneditable,
  resetRowData,
  updateData,
  refetch,
}) => {
  const onClose = () => {
    setRowUneditable();
    resetRowData();
  };

  const onEdit = () => {
    setRowEditable();
  };

  const onSave = () => {
    updateData();
    setRowUneditable();
    refetch();
  };

  return editable ? (
    <Flex justifyContent="space-around">
      <CheckIcon
        cursor="pointer"
        color="green.300"
        boxSize="0.75em"
        onClick={onSave}
      />
      <CloseIcon
        cursor="pointer"
        color="red.300"
        boxSize="0.75em"
        onClick={onClose}
      />
    </Flex>
  ) : (
    <Flex justifyContent="space-around">
      <EditIcon cursor="pointer" boxSize="0.75em" onClick={onEdit} />
    </Flex>
  );
};

export default RowActions;
