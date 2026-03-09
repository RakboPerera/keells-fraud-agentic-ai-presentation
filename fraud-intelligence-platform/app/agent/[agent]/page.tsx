import { notFound } from "next/navigation";
import { agentSlugs, getAgent, agents } from "@/data/agents";
import { getAgentMarkdown } from "@/lib/markdown";
import {
  parseSignalsMonitored,
  parseOperationalContext,
  parseFraudScenarios,
  parseWorkflowStages,
  parseAnalyticsTechniques,
} from "@/lib/markdownParser";
import AgentSlideshow from "./AgentSlideshow";

interface AgentPageProps {
  params: Promise<{ agent: string }>;
}

export async function generateStaticParams() {
  return agentSlugs.map((agent) => ({ agent }));
}

export default async function AgentPage({ params }: AgentPageProps) {
  const { agent: slug } = await params;
  const agentData = getAgent(slug);
  if (!agentData) notFound();

  /* ── Load & parse markdown ──────────────────────────────────────────── */
  const md = await getAgentMarkdown(slug);

  const signals = parseSignalsMonitored(md.overview);
  const { context, challenges } = parseOperationalContext(md.overview);
  const scenarios = parseFraudScenarios(md.fraudScenarios);
  const stages = parseWorkflowStages(md.agentWorkflow);
  const techniques = parseAnalyticsTechniques(md.analyticsComponents);

  /* ── Prev / next agent ──────────────────────────────────────────────── */
  const currentIndex = agents.findIndex((a) => a.slug === slug);
  const prevAgent =
    currentIndex > 0 ? agents[currentIndex - 1] : agents[agents.length - 1];
  const nextAgent =
    currentIndex < agents.length - 1 ? agents[currentIndex + 1] : agents[0];

  return (
    <AgentSlideshow
      slug={slug}
      color={agentData.color}
      title={agentData.title}
      shortTitle={agentData.shortTitle}
      description={agentData.description}
      icon={agentData.icon}
      signals={signals}
      context={context}
      challenges={challenges}
      scenarios={scenarios}
      stages={stages}
      techniques={techniques}
      prevAgent={{
        slug: prevAgent.slug,
        shortTitle: prevAgent.shortTitle,
        color: prevAgent.color,
      }}
      nextAgent={{
        slug: nextAgent.slug,
        shortTitle: nextAgent.shortTitle,
        color: nextAgent.color,
      }}
    />
  );
}
