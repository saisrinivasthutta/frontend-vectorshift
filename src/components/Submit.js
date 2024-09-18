// submit.js
import { useStore } from "./Store";
import { shallow } from "zustand/shallow";
import axios from "axios";
import styles from "./Submit.module.css";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    try {
      // Prepare the payload
      const payload = {
        nodes: nodes.map((node) => ({ id: node.id, type: node.type })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
        })),
      };
      console.log(payload);

      // Send POST request to the backend
      //The url must be path where the Backend is Running
      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      const { num_nodes, num_edges, is_dag } = response.data;

      // Display an alert with the response
      alert(
        `Number of Nodes: ${num_nodes}\nNumber of Edges: ${num_edges}\nIs DAG: ${
          is_dag ? "Yes" : "No"
        }`
      );

      console.log(payload);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert("There was an error submitting the pipeline.");
    }
  };

  return (
    <button className={styles.button} onClick={handleSubmit}>
      Submit Pipeline
    </button>
  );
};
