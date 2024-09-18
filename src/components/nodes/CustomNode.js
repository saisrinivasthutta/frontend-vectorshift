// TextNode.js
import { useState } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const CustomNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "Custom Text");

  const handleTextChange = (e) => setCurrText(e.target.value);

  const content = {
    title: "Custom Node",
    fields: [
      {
        label: "Custom Node",
        type: "text",
        key: "custom",
        defaultValue: currText,
        onChange: handleTextChange,
      },
    ],
  };

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: "system",
    },
    {
      type: "source",
      position: Position.Right,
      id: "output",
    },
  ];

  return <BaseNode id={id} data={data} handles={handles} content={content} />;
};
