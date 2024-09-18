// OutputNode.js
import { useState } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  const content = {
    title: "Output",
    fields: [
      {
        label: "Name",
        type: "text",
        key: "outputName",
        defaultValue: currName,
        onChange: handleNameChange,
      },
      {
        label: "Type",
        type: "select",
        key: "outputType",
        defaultValue: outputType,
        onChange: handleTypeChange,
        options: ["Text", "File"],
      },
    ],
  };

  const handles = [{ type: "target", position: Position.Left, id: "value" }];

  return <BaseNode id={id} data={data} handles={handles} content={content} />;
};
