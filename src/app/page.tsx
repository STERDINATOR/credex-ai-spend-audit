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
            onClick={() => {

            const result = generateAudit({
            tool,
            plan,
            monthlySpend: Number(monthlySpend),
            seats: Number(seats),
            });

            setAuditResult(result);
            }}

            className="w-full bg-white text-black font-semibold py-3 rounded-lg"
            >
            Analyze Spend
          </button>
          {
            auditResult && (

              <div className="mt-8 bg-zinc-800 p-6 rounded-xl">

                <h2 className="text-2xl font-bold mb-4">
                  Audit Results
                </h2>

                <p className="mb-2">
                  <span className="font-semibold">
                    Recommendation:
                  </span>{" "}
                  {auditResult.recommendation}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">
                    Estimated Savings:
                  </span>{" "}
                  ${auditResult.savings}/month
                </p>

                <p className="text-gray-400">
                  {auditResult.reason}
                </p>
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}