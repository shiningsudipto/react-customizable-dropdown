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
  const [isLoading, setIsLoading] = useState(true);
  const [asyncValue, setAsyncValue] = useState<
    string | number | (string | number)[] | undefined
  >();

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setAsyncOptions([
        { value: "api-1", label: "Fetched Item 1" },
        { value: "api-2", label: "Fetched Item 2" },
        { value: "api-3", label: "Fetched Item 3" },
      ]);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
              textColor: "#fff",
              hoverColor: "#374151",
              primaryColor: "#60a5fa",
              selectedOptionTextColor: "#ffffff",
              selectedOptionBackgroundColor: "#4c1d95",
              optionTextColor: "#fff",
            }}
          />
        </div>

        {/* Example 1 - Stunning Purple Gradient */}
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 p-6 rounded-2xl shadow-lg border border-purple-100 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-purple-700 uppercase tracking-wider flex items-center gap-2">
            <span className="text-lg">✨</span> Premium Multi-Select
          </h2>
          <Dropdown
            options={sampleOptions}
            value={multiValue}
            onChange={(val) => setMultiValue(val)}
            placeholder="Choose your favorite frameworks..."
            multiSelect
            searchable
            label="Tech Stack Selection"
            labelClassName="text-purple-900 font-semibold text-sm mb-1"
            triggerClassName="border-2 border-purple-300 rounded-xl px-4 py-3 hover:border-purple-400 hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm"
            menuClassName="shadow-2xl border-2 border-purple-200"
            optionClassName="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 px-4 py-3"
            selectedOptionClassName="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 font-medium"
            arrowIcon={
              <svg
                className="w-5 h-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
            }
            arrowIconClassName="animate-bounce-slow"
            theme={{
              primaryColor: "#a855f7",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              hoverColor: "#faf5ff",
              textColor: "#581c87",
              focusBorderColor: "#c084fc",
              selectedOptionTextColor: "#7c3aed",
              selectedOptionBackgroundColor: "#f3e8ff",
              multiSelectSelectedOptionTextColor: "#ffffff",
              multiSelectSelectedOptionBackgroundColor: "#a855f7",
              menuBackgroundColor: "#ffffff",
              optionTextColor: "#6b21a8",
            }}
          />
        </div>

        {/* Example 2 - Ocean Breeze Theme */}
        <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-cyan-100 flex flex-col gap-4 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl -z-10"></div>
          <h2 className="text-sm font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-2">
            <span className="text-lg">🌊</span> Ocean Breeze
          </h2>
          <Dropdown
            options={sampleOptions}
            value={asyncValue}
            onChange={(val) => setAsyncValue(val)}
            placeholder="Dive into your selection..."
            searchable
            label="Featured Framework"
            labelClassName="text-cyan-900 font-semibold text-sm mb-1"
            triggerClassName="border-2 border-cyan-300 rounded-2xl px-5 py-4 hover:border-cyan-500 hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-md hover:scale-[1.02]"
            menuClassName="shadow-2xl border-2 border-cyan-200 rounded-2xl"
            optionClassName="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 px-5 py-3 transition-all duration-200"
            selectedOptionClassName="bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-900 font-semibold border-l-4 border-cyan-500"
            arrowIcon={
              <div className="relative">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            }
            arrowIconClassName="transition-transform duration-500 ease-out"
            theme={{
              primaryColor: "#06b6d4",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              hoverColor: "#ecfeff",
              textColor: "#164e63",
              focusBorderColor: "#0891b2",
              selectedOptionTextColor: "#0e7490",
              selectedOptionBackgroundColor: "#cffafe",
              menuBackgroundColor: "#ffffff",
              optionTextColor: "#155e75",
              padding: "0.75rem 1.25rem",
            }}
            triggerStyle={{
              boxShadow: "0 4px 20px rgba(6, 182, 212, 0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
