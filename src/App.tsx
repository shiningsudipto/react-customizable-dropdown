import { useState, useEffect } from "react";
import type { DropdownOption } from "./components/Dropdown";
import { Dropdown } from "./components/Dropdown";

const sampleOptions = [
  { value: "1", label: "React" },
  { value: "2", label: "Vue" },
  { value: "3", label: "Angular" },
  { value: "4", label: "Svelte" },
  { value: "5", label: "Next.js" },
  { value: "6", label: "Nuxt" },
  { value: "7", label: "Gatsby" },
  { value: "8", label: "Remix" },
];

function App() {
  const [singleValue, setSingleValue] = useState<
    string | number | (string | number)[] | undefined
  >("1");
  const [multiValue, setMultiValue] = useState<
    string | number | (string | number)[] | undefined
  >(["1", "5"]);
  const [themeValue, setThemeValue] = useState<
    string | number | (string | number)[] | undefined
  >();

  // Async Mock
  const [asyncOptions, setAsyncOptions] = useState<DropdownOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [asyncValue, setAsyncValue] = useState<
    string | number | (string | number)[] | undefined
  >();

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setAsyncOptions([
        { value: "api-1", label: "Fetched Item 1" },
        { value: "api-2", label: "Fetched Item 2" },
        { value: "api-3", label: "Fetched Item 3" },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Single Select */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Single Select
          </h2>
          <Dropdown
            options={sampleOptions}
            value={singleValue}
            onChange={(val) => setSingleValue(val)}
            placeholder="Select a framework"
            searchable
          />
        </div>

        {/* Multi Select */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Multi Select
          </h2>
          <Dropdown
            options={sampleOptions}
            value={multiValue}
            onChange={(val) => setMultiValue(val)}
            placeholder="Select favorite stacks"
            searchable
            multiSelect
          />
        </div>

        {/* Async Loading */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Async Data
          </h2>
          <Dropdown
            options={asyncOptions}
            loading={isLoading}
            value={asyncValue}
            onChange={(val) => setAsyncValue(val)}
            placeholder={isLoading ? "Loading data..." : "Select fetched item"}
          />
          <button
            onClick={() => {
              setIsLoading(true);
              setAsyncOptions([]);
              setTimeout(() => {
                setAsyncOptions(sampleOptions);
                setIsLoading(false);
              }, 1500);
            }}
            className="text-xs text-blue-500 hover:underline self-start"
          >
            Reload Data
          </button>
        </div>

        {/* Completely Custom Style */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-sm flex flex-col gap-4 text-white">
          <h2 className="text-sm font-semibold text-white/90 uppercase tracking-wide">
            Deep Customization
          </h2>
          <div className="max-w-md w-full">
            <Dropdown
              label="Customization Testing"
              labelClassName="text-white text-lg mb-1"
              options={sampleOptions}
              value={singleValue}
              onChange={(val) => setSingleValue(val)}
              placeholder="Custom Styled"
              theme={{}}
            />
          </div>
        </div>

        {/* Custom Theme (Dark) */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
            Dark Theme
          </h2>
          <Dropdown
            options={sampleOptions}
            value={themeValue}
            onChange={(val) => setThemeValue(val)}
            placeholder="Dark Mode Select"
            theme={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              textColor: "#fff",
              hoverColor: "#374151",
              primaryColor: "#60a5fa",
              selectedOptionTextColor: "#ffffff",
              selectedOptionBackgroundColor: "#4c1d95",
              optionTextColor: "#fff",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
