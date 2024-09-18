import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./Store";
import { shallow } from "zustand/shallow";
import { InputNode } from "./nodes/InputNode";
import { LLMNode } from "./nodes/LLMNode";
import { OutputNode } from "./nodes/OutputNode";
import { TextNode } from "./nodes/TextNode";
import { CustomNode } from "./nodes/CustomNode";
import CustomEdge from "./edges/CustomEdge";
import "reactflow/dist/style.css";

const gridSize = 22;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  custom: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  deleteEdge: state.deleteEdge,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Modified onConnect to handle edge label creation
  const handleConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const sourceValue = sourceNode.data.nodeType.toUpperCase();

      // Create the new edge with a label from the source node
      const newEdge = {
        ...params,
        label: sourceValue,
        type: "customEdge",
        style: { stroke: "#4a90e2", strokeWidth: 2 },
        animated: true,
      };

      onConnect(newEdge); // Add the edge to the store
    },
    [nodes, onConnect]
  );

  return (
    <>
      <div
        ref={reactFlowWrapper}
        style={{ width: "100vw", height: "78vh", background: "#f9f9f9" }} // Set full width and specific height
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: "#4a90e2", strokeWidth: 2 },
          }}
          connectionLineType="bezier"
          fitView
          panOnScroll
          zoomOnScroll
          panOnDrag
        >
          <Background variant="dots" gap={20} size={2} color="#ccc" />
          <Controls
            showInteractive={false}
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}
          />
          <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "output") return "#ff0072";
              if (n.type === "default") return "#1a192b";
              return "#eee";
            }}
            nodeColor={(n) => {
              return n.style?.background || "#fff";
            }}
            nodeBorderRadius={2}
            maskColor="rgba(240, 240, 240, 0.5)"
          />
        </ReactFlow>
      </div>
    </>
  );
};
