// LLMNode.js
import BaseNode from "./BaseNode";
import Position from "reactflow";

export const LLMNode = ({ id, data }) => {
  const content = {
    title: "LLM",
    fields: [
      {
        label: "Description",
        type: "text",
        key: "description",
        defaultValue: "This is a LLM.",
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
      type: "target",
      position: Position.Left,
      id: "prompt",
    },
    {
      type: "source",
      position: Position.Right,
      id: "response",
    },
  ];

  return <BaseNode id={id} data={data} handles={handles} content={content} />;
};
