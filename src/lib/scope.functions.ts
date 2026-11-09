import { createServerFn } from "@tanstack/react-start";

export type ProjectScope = {
  summary: string;
  services: { name: string; reason: string }[];
  deliverables: string[];
  phases: { name: string; duration: string; tasks: string[] }[];
  timeline: string;
  considerations: string[];
};

export type ScopeResult = { scope: ProjectScope } | { error: string };

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["summary", "services", "deliverables", "phases", "timeline", "considerations"],
  properties: {
    summary: { type: "string" },
    services: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "reason"], properties: { name: { type: "string" }, reason: { type: "string" } } } },
    deliverables: { type: "array", items: { type: "string" } },
    phases: { type: "array", items: { type: "object", additionalProperties: false, required: ["name", "duration", "tasks"], properties: { name: { type: "string" }, duration: { type: "string" }, tasks: { type: "array", items: { type: "string" } } } } },
    timeline: { type: "string" },
    considerations: { type: "array", items: { type: "string" } },
  },
} as const;

export const generateScope = createServerFn({ method: "POST" })
  .inputValidator((input: { description: string; budget?: string }) => {
    const description = String(input?.description ?? "").trim();
    if (description.length < 20) throw new Error("Please describe your project in at least 20 characters.");
    if (description.length > 3000) throw new Error("Please keep your description under 3000 characters.");
    return { description, budget: String(input?.budget ?? "").slice(0, 100) };
  })
  .handler(async ({ data }): Promise<ScopeResult> => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions:
          "You are a senior project strategist at Webild, a web design and development agency. Webild offers: Web Development, SEO Optimization, Branding, plus responsive design, fast turnaround (typical projects take 2-4 weeks), secure hosting and ongoing maintenance. Write a concise, realistic project scope for the prospective client. Only recommend services Webild offers. Do not quote prices.",
        input: [{ role: "user", content: `Project description:\n${data.description}\n\nBudget: ${data.budget || "not specified"}` }],
        text: { format: { type: "json_schema", name: "project_scope", strict: true, schema } },
      } as never);
      const r = res as unknown as { output_text?: string; output?: { type: string; content?: { type: string; text?: string }[] }[] };
      const text = r.output_text ?? r.output?.flatMap(o => o.content ?? []).find(c => c.type === "output_text")?.text;
      if (!text) return { error: "The assistant didn't return a scope. Please try again." };
      return { scope: JSON.parse(text) as ProjectScope };
    } catch (e) {
      console.error("scope generation failed", e);
      if (e instanceof GatewayError && e.code === "rate_limited") return { error: "Too many requests right now. Please wait a moment and try again." };
      return { error: "We couldn't generate a scope right now. Please try again." };
    }
  });
