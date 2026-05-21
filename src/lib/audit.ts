type AuditInput = {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
};

type AuditResult = {
  recommendation: string;
  savings: number;
  reason: string;
};

export function generateAudit(
  input: AuditInput
): AuditResult {

  const {
    tool,
    plan,
    monthlySpend,
    seats,
  } = input;

  if (
    tool === "ChatGPT" &&
    plan === "Team" &&
    seats <= 2
  ) {
    return {
      recommendation:
        "Downgrade to ChatGPT Plus",

      savings: monthlySpend - 40,

      reason:
        "Small teams usually do not need Team features.",
    };
  }

  if (
    tool === "Cursor" &&
    plan === "Business" &&
    seats <= 3
  ) {
    return {
      recommendation:
        "Switch to Cursor Pro",

      savings: monthlySpend - 60,

      reason:
        "Cursor Business becomes inefficient for very small teams.",
    };
  }

  if (
    tool === "Claude" &&
    plan === "Team" &&
    seats <= 2
  ) {
    return {
      recommendation:
        "Use Claude Pro instead",

      savings: monthlySpend - 40,

      reason:
        "Team plans are better suited for larger organizations.",
    };
  }

  return {
    recommendation:
      "Your setup already looks cost efficient.",

    savings: 0,

    reason:
      "No meaningful savings opportunities detected.",
  };
}