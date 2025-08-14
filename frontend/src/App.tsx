import React, { useState } from "react";
import { fetchPropertyDetails } from "./services/property";
import { Loader } from "./components/Loader";
import { Toast } from "./components/Toast";
import { PropertyTable } from "./components/PropertyTable";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    type: "",
    title: "",
    body: "",
  });
  const [toastKey, setToastKey] = useState(0);

  const [apiResponse, setApiResponse] = useState<any>(null);
  const backendApiUrl = import.meta.env.VITE_BACKEND_API_URL;
  const isDisabled = loading || searchTerm === "";

  const showToast = (
    payload: React.SetStateAction<{ type: string; title: string; body: string }>
  ) => {
    setToast(payload);
    setToastKey((k) => k + 1);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchPropertyDetails(backendApiUrl, searchTerm);
      setApiResponse({ data });
      showToast({
        type: "success",
        title: "Success",
        body: "Search completed!",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setApiResponse({ error: "Failed to fetch data" });
      showToast({ type: "error", title: "Bad Request", body: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {toast && toast?.type !== "" && (
        <Toast
          key={toastKey} // utilized ChatGPT for this key concept to make sure the toast will reappear during other events
          type={toast.type}
          title={toast.title}
          body={toast.body}
        />
      )}

      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Hometap Property Detail Search
      </h1>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter full address, including street, city, state, and zip"
          className="p-3 border border-gray-300 rounded-md w-[600px]"
        />
        <button
          onClick={handleSearch}
          disabled={isDisabled}
          className={`${
            isDisabled ? "bg-gray-500" : "bg-blue-500"
          } text-white px-6 py-3 rounded-md`}
        >
          <span className="min-w-24">{loading ? <Loader /> : "Search"}</span>
        </button>
      </div>

      {apiResponse?.data && <PropertyTable data={apiResponse.data} />}
    </div>
  );
};

export default App;
