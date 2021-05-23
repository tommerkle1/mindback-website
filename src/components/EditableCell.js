import React from "react";
import Textarea from "./AutoResizeTextarea";

const EditableCell = ({ value, editable, setValue }) => {
  // We need to keep and update the state of the cell normally

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // If the initialValue is changed external, sync it up with our state
  // React.useEffect(() => {
  //   console.log("initial value was updated");
  //   setValue(value);
  // }, [value]);

  return (
    <Textarea
      // focusBorderColor="green.300"
      rows={1}
      disabled={!editable}
      style={{ cursor: editable ? "text" : "default" }}
      value={value}
      onChange={onChange}
    />
  );
};

export default EditableCell;
