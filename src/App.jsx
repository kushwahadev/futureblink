import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
// import { MagicWandIcon } from "@radix-ui/react-icons";

const initialNodes = [
  {
    id: "1",
    data: { label: "Leads From Emails", count: 1 },
    position: { x: 0, y: 0 },
    // type: "input",
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    label: "SEQUENCE START POINT",
    type: "step",
  },
];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  function getLabel() {
    return prompt("Enter a label");
  }

  useEffect(() => {}, []);

  function addObj() {
    const obj = {
      id: (initialNodes.length + 1).toString(),
      data: {
        label: getLabel(),
        count: initialNodes.length + 1,
      },
      position: {
        x: 0,
        y: initialNodes[initialNodes.length - 1].position.y + 100,
      },
    };
    if (obj.data.label === "") return;
    initialNodes.push(obj);
    setNodes(initialNodes);
    console.log(initialNodes);
  }

  function removeNode() {
    let index = prompt("Enter a node list number");

    if (index < "2") {
      alert("please enter a list number expected 1");
      return;
    }
    console.log(index);
    console.log(typeof index);
    initialNodes.splice(index, 1);
    setNodes(initialNodes);
    console.log(initialNodes);
  }

  return (
    <div style={{ height: 800, color: "red" }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />

        <Controls>
          {/* <ControlButton></ControlButton> */}
          <button
            className=" text-sm text-center p-3 rounded-lg border-red-700 text-red-700 bg-white "
            onClick={() => addObj()}
          >
            Add Lead Source
            <span>
              <br />
              click to add lead from list
            </span>
          </button>
          <br />
          <button
            className=" text-sm text-center p-3 rounded-lg border-red-700 text-purple-500 bg-white "
            onClick={() => removeNode()}
          >
            remove list node
          </button>
        </Controls>
      </ReactFlow>
    </div>
  );
}

export default App;
