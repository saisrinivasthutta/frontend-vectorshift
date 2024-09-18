import React from "react";
import { getBezierPath } from "reactflow";
import { useStore } from "../Store";
import { shallow } from "zustand/shallow";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }) => {
  const { deleteEdge } = useStore(
    (state) => ({
      deleteEdge: state.deleteEdge,
    }),
    shallow
  );

  const centerX = (sourceX + targetX) / 2;
  const centerY = (sourceY + targetY) / 2;

  const [path] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path"
        d={path}
        style={{ stroke: "#4a90e2", strokeWidth: 2 }}
        markerEnd={markerEnd}
      />
      <circle
        cx={centerX}
        cy={centerY}
        r={8}
        fill="#fff"
        stroke="#4a90e2"
        strokeWidth={2}
        onDoubleClick={() => deleteEdge(id)}
      />
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize="12"
        fill="#4a90e2"
        onDoubleClick={() => deleteEdge(id)}
        style={{ cursor: "pointer" }}
      >
        X
      </text>
    </>
  );
};

export default CustomEdge;
