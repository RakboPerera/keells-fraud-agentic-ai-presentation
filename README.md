# Keells Fraud Intelligence Platform – Interactive Presentation

This project defines the specification for generating an interactive web-based presentation that demonstrates how Agentic AI and Advanced Analytics can be used to detect and prevent fraud across retail operations.

The presentation is designed as an interactive click-through experience rather than a traditional slide deck. Users begin with a high-level ecosystem view of fraud intelligence capabilities and can explore individual analytical agents in depth.

The objective is to demonstrate how a coordinated system of analytical agents can continuously monitor operational activity across the retail enterprise and generate investigation intelligence for fraud and risk management teams.

The final output should resemble a modern interactive product experience or consulting-style digital presentation rather than a static slide deck.

---

# Project Architecture

This repository contains the full specification required for Claude Code to generate the interactive fraud intelligence presentation.

The project is organized into three primary layers:

1. Context Layer  
2. UI Layer  
3. Agents Layer  

Each layer provides a different set of instructions that Claude uses to construct the final presentation.

---

# How Claude Should Use This Repository

Claude should treat the markdown files in this repository as the knowledge base and design specification for generating the interactive presentation.

The system should:

• read the context layer to understand the business problem and platform architecture  
• read the UI layer to understand how the presentation should be structured and visualized  
• read the agent specifications to generate the detailed analytical use cases  

The output should be a coherent interactive web-based experience that integrates all of these components.

---

# Context Layer

The context layer defines the business problem, narrative structure, and high-level system architecture.

```
context/
project_overview.md
storytelling_framework.md
design_principles.md
fraud_domain_overview.md
system_architecture.md
```

These files provide the conceptual foundation required to generate the presentation.

### project_overview.md
Explains the fraud risk challenge in retail and introduces the opportunity for AI-driven fraud detection.

### storytelling_framework.md
Defines the narrative arc of the presentation and guides how the story should unfold from problem to solution.

### design_principles.md
Describes the visual and design philosophy for the presentation experience.

### fraud_domain_overview.md
Defines the five operational fraud domains monitored by the system.

### system_architecture.md
Explains the architecture of the fraud intelligence platform and how analytical agents operate together.

---

# UI Layer

The UI layer defines how the presentation should be structured visually and interactively.

```
ui/
landing_page.md
ecosystem_map.md
agent_workflow_visualization.md
use_case_page_layout.md
design_system.md
```

These files provide the instructions for building the user interface and interaction patterns.

### landing_page.md
Defines the introduction to the fraud intelligence platform.

### ecosystem_map.md
Defines the visual ecosystem showing the different analytical agents.

### agent_workflow_visualization.md
Defines how analytical workflows should appear visually.

### use_case_page_layout.md
Defines the structure of each analytical agent page.

### design_system.md
Defines the visual design language including layout structure and interface behavior.

---

# Agents Layer

The agents layer defines the analytical agents responsible for monitoring fraud across operational domains.

```
agents/
transaction_integrity/
promotion_integrity/
inventory_shrinkage/
supplier_risk/
nexus_loyalty_integrity/
```

Each agent represents a specialized analytical capability within the fraud intelligence platform.

Every agent folder contains four specification files:

```
overview.md
fraud_scenarios.md
agent_workflow.md
analytics_components.md
```

These files define the full analytical capability of each agent.

### overview.md
Explains the operational environment and the fraud risks monitored by the agent.

### fraud_scenarios.md
Provides realistic examples of fraud or misuse patterns that may occur.

### agent_workflow.md
Explains the analytical workflow used by the AI agent to detect anomalies.

### analytics_components.md
Describes the analytical techniques used by the system.

---

# Fraud Intelligence Domains

The fraud intelligence platform monitors five key operational domains across the retail enterprise.

## Transaction Integrity Intelligence

Monitors point-of-sale activity to detect suspicious checkout behavior such as:

• price override abuse  
• refund manipulation  
• unusual transaction patterns

---

## Promotion Integrity Intelligence

Analyzes how promotions and discounts are applied across transactions to detect:

• misuse of promotional mechanics  
• abnormal discount behavior  
• promotion rule violations

---

## Inventory Shrinkage Intelligence

Monitors inventory movement across stores and supply chains to detect:

• stock discrepancies  
• delivery mismatches  
• unusual wastage patterns

---

## Supplier Risk Intelligence

Analyzes procurement and supplier interactions to detect:

• supplier pricing anomalies  
• delivery discrepancies  
• unusual procurement patterns

---

## Nexus Loyalty Integrity Intelligence

Monitors loyalty program activity to detect:

• loyalty point abuse  
• reward redemption manipulation  
• coordinated loyalty exploitation

---

# Fraud Intelligence Ecosystem

The platform operates as a coordinated ecosystem of analytical agents.

Each agent continuously monitors operational signals within its domain and applies behavioral analytics and anomaly detection techniques.

Signals monitored across the system include:

• transaction activity  
• discount application behavior  
• inventory movement  
• procurement patterns  
• loyalty program engagement

By analyzing these signals across multiple systems, the platform can detect patterns of fraud that would otherwise remain hidden within large operational datasets.

---

# Interactive Presentation Experience

Users interact with the presentation through the following journey:

1. Landing Page  
Introduction to the concept of an AI-powered fraud intelligence platform.

2. Fraud Intelligence Ecosystem  
A visual map showing the different analytical agents monitoring fraud domains.

3. Agent Deep Dive Pages  
Interactive pages where users explore how each agent detects fraud patterns.

Each deep dive page includes the following sections:

Operational Context  
Signals Monitored  
Fraud Scenarios  
Agent Workflow  
Analytics Components

---

# Expected Output

The final generated experience should resemble a modern interactive AI platform demonstration.

The presentation should be:

• visually clean  
• highly interactive  
• structured around analytical workflows  
• easy for executives to understand

The goal is to clearly communicate how advanced analytics and agentic AI can help retailers detect fraud patterns across complex operational systems.