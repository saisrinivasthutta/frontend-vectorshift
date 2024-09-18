import { PipelineToolbar } from "./components/Toolbar";
import { PipelineUI } from "./components/UI";
import { SubmitButton } from "./components/Submit";

import "./App.css";

function App() {
  return (
    <div className="container">
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
