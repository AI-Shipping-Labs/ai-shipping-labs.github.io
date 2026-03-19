---
title: "Theory Interview Questions"
description: "Prepare for AI engineer interviews with theory questions on LLMs, RAG, AI agents, evaluation, monitoring, cost optimization, and safety."

sections:
  - id: "llm-practice"
    title: "1. Working with Large Language Models (LLMs)"
    intro: "This section covers the practical fundamentals of working with large language models in real applications. It focuses on how LLMs generate text, how their outputs can be shaped through inference-time controls, and what constraints appear when you work with long prompts, memory, and context. These questions are meant to test whether someone understands the operational basics of using LLMs."

    qa:
      - question: "How do large language models work at a high level?"
      - question: "What parameters can you use to control LLM output, and how do they affect behavior?"
      - question: "How do LLMs handle context, and what practical limits does the context window introduce?"
      - question: "How do you manage memory and context effectively in LLM applications?"

  - id: "rag-systems"
    title: "2. Retrieval-Augmented Generation (RAG)"
    intro: "This section focuses on systems that connect LLMs to external knowledge sources so their answers can be grounded in real documents, databases, and other data. It covers the full RAG pipeline, including retrieval strategy, document processing, attribution, scaling, and debugging. These questions assess whether someone can reason about RAG as a system, not just define it at a high level."

    qa:
      - question: "What is retrieval-augmented generation (RAG), and how does the full pipeline work?"
      - question: "What retrieval strategies can you use in RAG systems, and when would you use each?"
      - question: "How would you design a pipeline to process and retrieve information from very large PDF reports?"
      - question: "How would you prevent hallucinations when the retrieved context does not contain the answer?"
      - question: "What are the most common failure points in RAG systems, and how do you debug them?"
      - question: "How do you implement citations and source attribution in a RAG system?"
      - question: "What is semantic caching, and when is it useful?"
      - question: "How would you scale a RAG system to tens of millions of documents?"
      - question: "What are the main design trade-offs in a RAG system?"

  - id: "agents-and-tool-use"
    title: "3. Agents and Tool-Using Systems"
    intro: "This section covers a more advanced class of LLM applications: systems that do more than generate text and can instead choose tools, take actions, and operate across multiple steps. It includes questions about what makes a system agentic, how tools are selected and executed, how to prevent failure modes such as loops or unsafe behavior, and how to design agent workflows for realistic use cases. These questions are useful for understanding whether a candidate can move from simple prompting to building action-oriented systems."

    qa:
      - question: "What makes an AI system agentic?"
      - question: "What components does an agent need beyond the language model itself?"
      - question: "How should an agent decide when and how to use tools?"
      - question: "When is an agent the wrong solution?"
      - question: "How would you explain an agentic system to non-technical stakeholders?"
      - question: "How do you control agent execution, including loop detection, termination, retries, and idempotency?"
      - question: "How do you sandbox tool execution safely in agent systems?"
      - question: "What are the biggest security risks in tool-using agents?"
      - question: "How would you design an agent that analyzes customer support tickets, drafts replies, and escalates complex cases?"
      - question: "How would you design an agent that reviews code and suggests improvements?"

  - id: "testing-and-evaluation"
    title: "4. Testing and Evaluation"
    intro: "This section focuses on how to measure whether an LLM system is actually working well. Because model outputs are probabilistic and task-dependent, evaluation is more complex than in traditional software systems. The questions in this section cover consistency, accuracy, hallucination detection, benchmark design, golden datasets, and end-to-end evaluation for chatbots, RAG pipelines, and agents."

    qa:
      - question: "How do you make LLM outputs more consistent and accurate?"
      - question: "How do you evaluate conversational AI systems such as chatbots?"
      - question: "What metrics matter when evaluating LLM systems?"
      - question: "How do you build a high-quality evaluation or golden dataset?"
      - question: "What causes hallucinations in LLM systems, and how do you detect and mitigate them?"
      - question: "How would you reduce factual errors in a summarization system?"
      - question: "How do you debug a RAG chatbot that gives confident but incorrect answers?"
      - question: "How do you evaluate a RAG pipeline end to end?"
      - question: "How do you evaluate agent performance, including tool selection quality, action progress, and context adherence?"

  - id: "monitoring"
    title: "5. Monitoring and Production Observability"
    intro: "This section looks at what happens after deployment. Once an LLM system is live, the work shifts from building to observing, measuring, and maintaining quality over time. These questions cover operational and business metrics, online monitoring, rollout strategy, hallucination tracking, and production visibility into agent behavior. They are intended to assess whether someone understands how AI systems behave in real environments, where performance can drift and failures are often subtle."

    qa:
      - question: "What operational and business metrics matter for AI systems in production?"
      - question: "How do you evaluate and monitor a model in production, not just offline?"
      - question: "How would you test a new model before rolling it out fully?"
      - question: "How do you estimate and monitor hallucination rate in production?"
      - question: "How do you monitor and observe autonomous agent behavior in production?"

  - id: "cost-and-latency-optimization"
    title: "6. Cost and Latency Optimization"
    intro: "This section covers the engineering trade-offs involved in making LLM systems fast enough and affordable enough to use in production. It includes questions about latency bottlenecks, token costs, model routing, benchmarking, and cost-quality trade-offs at scale. The goal is to understand whether someone can reason not only about model quality, but also about system efficiency, budget constraints, and user experience under real traffic."

    qa:
      - question: "How do you reduce latency in GenAI applications?"
      - question: "What is time to first token, and why does it matter for user experience?"
      - question: "How would you benchmark a multi-step LLM pipeline to identify latency bottlenecks?"
      - question: "What are the main levers for reducing token usage and overall LLM cost?"
      - question: "How do you think about cost-versus-quality trade-offs, and when is a smaller model good enough?"
      - question: "What is model tiering, and when should you route requests to a smaller model versus a larger one?"
      - question: "How would you optimize cost for an application serving one million queries per day?"
      - question: "How would you estimate the budget for an enterprise-scale RAG pipeline, such as one built on 300,000 legal contracts?"

  - id: "safety-and-guardrails"
    title: "7. Safety, Security, and Guardrails"
    intro: "This section focuses on the safeguards needed to make LLM systems safe to deploy. It covers technical and product-level risks such as prompt injection, jailbreaks, unsafe code execution, harmful content, privacy issues, and exposure of sensitive data in prompts or logs. These questions are meant to evaluate whether someone can think beyond functionality and account for how AI systems can be misused, exploited, or cause harm if they are not designed with proper controls."
    qa:
      - question: "When should you implement LLM guardrails, and what forms can they take?"
      - question: "How do you handle data privacy and personally identifiable information in prompts, logs, and outputs?"
      - question: "How do you defend against prompt injection and jailbreak attempts?"
      - question: "How would you build a system that detects policy-violating or offensive content?"
      - question: "How would you prevent unsafe code generation and execution in an application that runs model-generated code?"

---

## Introduction

These theory interview questions were collected as part of our ongoing research into the [AI engineer role](/blog/what-is-an-ai-engineer-based-on-job-descriptions), based on real market data. We focused on questions that candidates are actually asked in AI engineer interviews, rather than trying to compile every possible question about large language models (LLMs), retrieval-augmented generation (RAG), agents, evaluation, or safety. The list is based on candidate reports shared on Reddit, X, and personal blogs, where people describe their interview experiences.

## Format

This part of the interview is usually 45 to 60 minutes and tends to be conversational. The interviewer asks conceptual questions to understand how well you grasp core AI and ML topics. There is typically no coding exercise or whiteboard task. Instead, the format is a back-and-forth discussion where the interviewer checks whether you can explain ideas clearly, reason through trade-offs, and connect concepts to practical system behavior.

Theory questions do not always appear as a fully separate round. In many interview processes, they are woven into other stages such as system design interviews, project deep dives, or broader AI and ML technical screens. Some companies do run a dedicated LLM theory or AI deep-dive round, but this is less common.

More often, these questions appear as follow-ups. You mention a concept such as RAG, agents, evaluation, or fine-tuning, and the interviewer uses that as an opening to test how well you actually understand it. In that sense, theory questions are often less about recall and more about depth. The interviewer is trying to see whether you can go beyond familiar terms and explain how the underlying ideas work in practice.

## How to Prepare

Focus more on practical system thinking than on abstract theory. In most AI engineer interviews, interviewers care less about whether you can recite Transformer internals from memory and more about whether you understand how to build, evaluate, and operate AI systems in practice. The questions that come up most often tend to center on RAG systems, agents, evaluation, and production concerns.

A good preparation strategy is to concentrate on the areas that show up repeatedly:

1. RAG systems: Be able to explain a complete pipeline end to end: ingestion, chunking, indexing, retrieval, ranking, prompt construction, response generation, and attribution. You should also be ready to discuss failure modes, debugging, and scaling.

2. Agents: Understand the full architecture, not just the idea of “tool use.” That includes planning, tool selection, execution flow, memory, retries, and termination conditions. One especially important question is when not to use an agent, since interviewers often want to see whether you can distinguish between a useful agentic workflow and unnecessary complexity.

3. Testing and evaluation: Be prepared to explain how you evaluate quality in practice. That includes building golden datasets, choosing useful metrics, reviewing outputs, and designing evaluations for systems like chatbots, RAG pipelines, and agents.

<!-- after-questions -->


## Common Mistakes

1. Being able to describe how to build a system, but not how to evaluate, monitor, or improve it after deployment.

2. Knowing what a concept is, but not being able to explain the trade-offs behind using it.

Interviewers usually care less about whether you can define RAG or agents and more about whether you can explain when they are the right choice, when they are not, and what problems they introduce.

3. Ignoring cost, latency, and failure modes.

Many candidates answer as if they are describing a prototype or demo. Interviewers are usually looking for production thinking: how the system behaves under real constraints, how it fails, what it costs to run, and how you would make it more reliable over time.