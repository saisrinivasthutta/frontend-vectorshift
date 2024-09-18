import { DraggableNode } from "./DraggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode name="Custom Input" type="customInput" label="Input" />
        <DraggableNode name="LLM" type="llm" label="LLM" />
        <DraggableNode name="Output" type="customOutput" label="Output" />
        <DraggableNode name="Text" type="text" label="Text" />
        <DraggableNode name="Custom Node" type="custom" label="Custom Node" />
      </div>
    </div>
  );
};
