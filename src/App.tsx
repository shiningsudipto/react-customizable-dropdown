import { useState } from "react";
import { Dropdown } from "./components/Dropdown";

const sampleOptions = [
  { label: "React", sublabel: "Frontend Library", value: "react" },
  { label: "Vue", sublabel: "Progressive Framework", value: "vue" },
  { label: "Angular", sublabel: "Comprehensive Platform", value: "angular" },
];

function App() {
  const [value, setValue] = useState<any>("react");

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Dropdown Package Demo
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <Dropdown
          label="Select Framework"
          options={sampleOptions}
          value={value}
          onChange={(val) => {
            console.log("Selected:", val);
            setValue(val);
          }}
          searchable
          placeholder="Choose a framework..."
        />

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm font-mono text-gray-600">
          Selected Value: {JSON.stringify(value)}
        </div>
      </div>
    </div>
  );
}

export default App;
