// utilized ChatGPT to add some modern UI styling consistancy

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 antialiased">
      {toast && toast.type && (
        <Toast
          key={toastKey} // utilized ChatGPT for this key concept to make sure the toast will reappear during other events
          type={toast.type}
          title={toast.title}
          body={toast.body}
        />
      )}
      <header className="mx-auto max-w-3xl px-4 pt-12 pb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Hometap Property Detail Search
          </span>
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter a full address to fetch normalized details and compare
          providers.
        </p>
      </header>
      <main className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur shadow-xl">
          <div className="p-4 sm:p-6">
            <label htmlFor="search" className="sr-only">
              Property address
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                >
                  <path
                    fill="currentColor"
                    d="M10 4a6 6 0 104.472 10.03l4.249 4.248a1 1 0 001.415-1.415l-4.248-4.249A6 6 0 0010 4zm-4 6a4 4 0 118 0 4 4 0 01-8 0z"
                  />
                </svg>
                <input
                  id="search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="4105 Random St, Random City, ST 00000"
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white pr-4 pl-10 text-sm placeholder:text-slate-400
                             shadow-sm outline-none transition
                             focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isDisabled}
                className="h-12 inline-flex items-center justify-center rounded-xl px-5 font-medium
                           shadow-sm transition
                           bg-blue-600 text-white hover:bg-blue-700
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                           disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="min-w-20">
                  {loading ? <Loader /> : "Search"}
                </span>
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Tip: include street, city, state, and ZIP for best results.
            </p>
          </div>
        </div>
        {apiResponse?.data && (
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-white shadow-lg">
            <div className="p-4 sm:p-6">
              <PropertyTable data={apiResponse.data} />
            </div>
          </div>
        )}
      </main>
      <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-slate-500">
        Jonathan Ferreras HomeTap Assessment
      </footer>
    </div>
  );
};

export default App;
