import { useState, useEffect } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";

function ApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchKeys = async () => {
    try {
      setLoading(true);

      const response = await API.get("/keys");

      setApiKeys(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const generateApiKey = async () => {
    try {
      await API.post("/keys/generate");

      fetchKeys();

      alert("API Key Generated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteKey = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this API Key?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/keys/${id}`);

      fetchKeys();
    } catch (error) {
      console.log(error);
    }
  };

  const copyKey = (key) => {
    navigator.clipboard.writeText(key);

    alert("API Key Copied");
  };

  const filteredKeys = apiKeys.filter((item) =>
    item.key
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const generatedToday = apiKeys.filter(
    (item) =>
      new Date(item.createdAt).toDateString() ===
      new Date().toDateString()
  ).length;

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              API Keys
            </h1>

            <p className="text-slate-500 mt-2">
              Generate and manage API Keys
            </p>
          </div>

          <button
            onClick={generateApiKey}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-3
              rounded-lg
              font-medium
              shadow-md
            "
          >
            + Generate API Key
          </button>
        </div>

        {/* Summary Cards */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mb-8
          "
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Total Keys
            </h3>

            <p className="text-3xl font-bold mt-2">
              {apiKeys.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Active Keys
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-600">
              {apiKeys.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-slate-500">
              Generated Today
            </h3>

            <p className="text-3xl font-bold mt-2 text-blue-600">
              {generatedToday}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search API Key..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              md:w-96
              px-4
              py-3
              border
              rounded-lg
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* API Key Cards */}
        {filteredKeys.length === 0 ? (
          <div
            className="
              bg-white
              p-10
              rounded-xl
              shadow-lg
              text-center
            "
          >
            <h2 className="text-xl font-semibold">
              No API Keys Found
            </h2>

            <p className="text-slate-500 mt-2">
              Generate your first API Key
              to start using Rate Limiter Pro.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredKeys.map((item) => (
              <div
                key={item._id}
                className="
                  bg-white
                  rounded-xl
                  shadow-lg
                  p-6
                  flex
                  justify-between
                  items-center
                "
              >
                <div>
                  <p className="font-semibold text-slate-700">
                    API Key
                  </p>

                  <p className="font-mono text-sm text-slate-500 mt-2">
                    {item.key
                      ? `${item.key.slice(
                          0,
                          15
                        )}********`
                      : ""}
                  </p>

                  <p className="text-sm text-slate-400 mt-2">
                    Created:
                    {" "}
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>

                  {item.limit && (
                    <p className="text-sm text-slate-400 mt-1">
                      Limit:
                      {" "}
                      {item.limit}
                      {" "}
                      requests/min
                    </p>
                  )}

                  {item.window && (
                    <p className="text-sm text-slate-400 mt-1">
                      Window:
                      {" "}
                      {item.window}
                      {" "}
                      seconds
                    </p>
                  )}

                  <p className="text-sm text-slate-400 mt-1">
                    Last Used:
                    {" "}
                    {item.lastUsed
                      ? new Date(
                          item.lastUsed
                        ).toLocaleString()
                      : "Never"}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <span
                    className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                    "
                  >
                    Active
                  </span>

                  <button
                    onClick={() =>
                      copyKey(item.key)
                    }
                    className="
                      bg-slate-700
                      hover:bg-slate-800
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Copy
                  </button>

                  <button
                    onClick={() =>
                      deleteKey(item._id)
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          className="
            text-center
            text-slate-500
            mt-10
          "
        >
          Rate Limiter Pro © 2026
        </div>

      </div>
    </>
  );
}

export default ApiKeys;