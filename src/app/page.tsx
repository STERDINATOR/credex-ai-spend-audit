"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("auditData");

    if (savedData) {
      const parsed = JSON.parse(savedData);

      setTool(parsed.tool || "");
      setPlan(parsed.plan || "");
      setMonthlySpend(parsed.monthlySpend || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "auditData",
      JSON.stringify({
        tool,
        plan,
        monthlySpend,
      })
    );
  }, [tool, plan, monthlySpend]);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          AI Spend Auditor
        </h1>

        <p className="text-gray-400 mb-10">
          Find out if your startup is overspending on AI tools.
        </p>

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

          <div className="mb-4">
            <label className="block mb-2">AI Tool</label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-800"
            >
              <option value="">Select Tool</option>
              <option>ChatGPT</option>
              <option>Claude</option>
              <option>Cursor</option>
              <option>GitHub Copilot</option>
              <option>Gemini</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Plan</label>

            <input
              type="text"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              placeholder="e.g. Team"
              className="w-full p-3 rounded-lg bg-zinc-800"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              value={monthlySpend}
              onChange={(e) =>
                setMonthlySpend(e.target.value)
              }
              placeholder="200"
              className="w-full p-3 rounded-lg bg-zinc-800"
            />
          </div>

          <button className="w-full bg-white text-black font-semibold py-3 rounded-lg">
            Analyze Spend
          </button>
        </div>
      </div>
    </main>
  );
}