// InputNode.js
import { useState } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  const content = {
    title: "Input",
    fields: [
      {
        label: "Name",
        type: "text",
        key: "inputName",
        defaultValue: currName,
        onChange: handleNameChange,
      },
      {
        label: "Type",
        type: "select",
        key: "inputType",
        defaultValue: inputType,
        onChange: handleTypeChange,
        options: ["Text", "File"],
      },
    ],
  };

  const handles = [{ type: "source", id: "value", position: Position.right }];

  return <BaseNode id={id} data={data} handles={handles} content={content} />;
};
