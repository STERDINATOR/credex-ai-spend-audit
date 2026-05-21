"use client";

import { generateAudit } from "@/lib/audit";
import React from "react";

import { useState, useEffect } from "react";

interface AuditResult {
  recommendation: string;
  savings: number;
  reason: string;
}

export default function Home() {
  const [tool, setTool] = useState(() => {
    if (typeof window === "undefined") return "";
    const savedData = localStorage.getItem("auditData");
    if (!savedData) return "";
    const parsed = JSON.parse(savedData);
    return parsed.tool || "";
  });
  const [plan, setPlan] = useState(() => {
    if (typeof window === "undefined") return "";
    const savedData = localStorage.getItem("auditData");
    if (!savedData) return "";
    const parsed = JSON.parse(savedData);
    return parsed.plan || "";
  });
  const [monthlySpend, setMonthlySpend] = useState(() => {
    if (typeof window === "undefined") return "";
    const savedData = localStorage.getItem("auditData");
    if (!savedData) return "";
    const parsed = JSON.parse(savedData);
    return parsed.monthlySpend || "";
  });
  const [seats, setSeats] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [summary, setSummary] = useState("");

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
            <label htmlFor="tool" className="block mb-2">AI Tool</label>

            <select
              id="tool"
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
          <div className="mb-6">
            <label className="block mb-2">
            Number of Seats
            </label>

            <input
            type="number"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            placeholder="5"
            className="w-full p-3 rounded-lg bg-zinc-800"
            />
            </div>

          <button
            onClick={async () => {
              const result = generateAudit({
                tool,
                plan,
                monthlySpend: Number(monthlySpend),
                seats: Number(seats),
              });

              setAuditResult(result);

              const response = await fetch("/api/summary", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tool,
                  recommendation: result.recommendation,
                  savings: result.savings,
                }),
              });

              const data = await response.json();
              setSummary(data.summary);
            }}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg"
          >
            Analyze Spend
          </button>

          {auditResult && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 rounded-2xl border border-zinc-700">
                <h2 className="text-4xl font-bold mb-2">
                  Save ${auditResult.savings}/month
                </h2>
                <p className="text-gray-400">
                  Estimated annual savings:
                  <span className="text-white font-semibold">
                    ${auditResult.savings * 12}
                  </span>
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                <h3 className="text-2xl font-bold mb-4">Recommendation</h3>
                <p className="mb-3 text-lg">{auditResult.recommendation}</p>
                <p className="text-gray-400">{auditResult.reason}</p>
              </div>
            </div>
          )}
          
          {summary && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold">Summary</h3>
              <p className="text-gray-700">{summary}</p>
            </div>
          )}
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

            <h3 className="text-2xl font-bold mb-4">
              Save Your Audit
            </h3>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
            />

            <button
              className="w-full bg-white text-black py-3 rounded-lg"
            >
              Save Audit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}