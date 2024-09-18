import { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([
    { type: "source", position: Position.Right, id: "output" },
  ]);
  const [dimensions, setDimensions] = useState({ width: 150, height: 80 }); // Initial size of the node

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    adjustNodeSize(newText);

    updateHandles(newText);
  };

  const adjustNodeSize = (text) => {
    const textLength = text.length;
    const width = Math.max(150, textLength * 8);
    const height = Math.max(80, Math.ceil(textLength / 20) * 24);
    setDimensions({ width, height });
  };

  const updateHandles = (text) => {
    const variablePattern = /\{\{(\w+)\}\}/g;
    const matches = [...text.matchAll(variablePattern)];

    const newHandles = matches.map((match, index) => ({
      type: "target",
      position: Position.Left,
      id: match[1],
    }));

    newHandles.push({ type: "source", position: Position.Right, id: "output" });

    setHandles(newHandles);
  };

  useEffect(() => {
    adjustNodeSize(currText);
    updateHandles(currText);
  }, []);

  const content = {
    title: "Text",
    fields: [
      {
        label: "Text",
        type: "text",
        key: "text",
        defaultValue: currText,
        onChange: handleTextChange,
      },
    ],
  };

  return (
    <BaseNode
      id={id}
      data={data}
      handles={handles}
      content={content}
      style={dimensions}
    />
  );
};
