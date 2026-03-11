---
authors:
- Valeriia Kuka
description: '### Plus, a new Buildcamp project on PDF information extraction, in-person
  events in Berlin, ongoing research on the AI Engineer role, a certificate automation
  experiment, and a few technical resources.'
image: images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/cover.jpg
layout: post
subtitle: '### Plus, a new Buildcamp project on PDF information extraction, in-person
  events in Berlin, ongoing research on the AI Engineer role, a certificate automation
  experiment, and a few technical resources.'
tags:
- ai
- newsletter
- blog
title: '**Building and Maintaining a Slack Moderation Bot for an 88k-Member Community**'
---

[Alexey Grigorev](https://substack.com/@alexeygrigorev){:target="_blank"}

Feb 06, 2026

### **One Thing I Want to Share This Week**

DataTalks.Club community has grown to more than 88,000 people and lives across many Slack channels. Moderating a community at this scale is time-consuming.

We also run “shameless-promotion” channels, and as the community grew, I introduced [rules and message templates](https://alexeygrigorev.notion.site/Shameless-channels-template-f565ac6aa2064f7190382f2ffd82c876){:target="_blank"} for posting there. I had to manually delete messages that violated the rules and send DMs explaining the reasons to those people. It quickly became impractical because it required a lot of manual steps

That is what pushed me to build an automation tool that could delete messages violating the rules and send a direct message explaining why.

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image4.jpg"  />
<figcaption>The number of messages deleted in the past week, grouped by reaction type. Without AuTomator, deleting these messages and sending direct messages with an explanation would all have been manual work.</figcaption>
</figure>

That is why I built the [AuTomator bot](https://github.com/alexeygrigorev/au-tomator-lambda){:target="_blank"} back in June 2022 and kept adding features as new needs came up. Recently, the bot broke, and I fixed it using Claude Code, which saved me at least two hours of debugging.

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image5.jpg"  />
<figcaption>In this post, I walk through how the bot is built and how I used AI to diagnose and fix it.</figcaption>
</figure>

#### **How the AuTomator Works**

AuTomator bot is a backend running on AWS Lambda.

It is split into three Lambdas, each with a clear responsibility.

##### **1. Router: Routes Slack events to the automator or moderator**

The router checks incoming emoji reactions to see whether they were added by an admin. If so, it forwards the event to the automator.

The router exists for a purely technical reason: Slack enforces a strict time limit on how quickly reaction events must be acknowledged. By keeping the router lightweight and delegating all real work to the automator, the system avoids timeouts and dropped events.

##### **2. Automator: Acts based on the emoji reaction by the admin**

The automator is responsible for actually doing something when a reaction emoji is added.

The bot has a predefined list of emojis and the actions they represent. This is configured in a [YAML file](https://github.com/alexeygrigorev/au-tomator-lambda/blob/main/automator/config.yaml){:target="_blank"}, and adding a new reaction is fairly straightforward.

When I react to a message with one of these emojis, the automator looks up what that reaction means and runs the corresponding action. This can be deleting a message, reposting it in a thread, or asking an AI to generate a reply. For example, when I add an [:ask-ai:](https://github.com/alexeygrigorev/au-tomator-lambda/blob/main/automator/config.yaml#L214){:target="_blank"} reaction, the automator replies in the thread with an AI-generated answer.

In some cases, the automator also contacts the author of the original message. For example, if I add a [:shameless-rules:](https://github.com/alexeygrigorev/au-tomator-lambda/blob/main/automator/config.yaml#L87){:target="_blank"} reaction, the automator deletes the message and sends the author a direct message explaining that the post violated the community rules and was removed.

##### **3. Moderator: watches message activity and helps the admin react quickly**

The moderator is a new Lambda that I implemented with GitHub Copilot. It is not deployed yet and still needs real-world testing.

Its role is to monitor message activity over time and spot simple patterns, like someone posting too many messages in a short period. When that happens, it sends an alert to an admin and includes action buttons directly in Slack.

These buttons allow the admin to delete recent messages, deactivate the user, or ignore the alert without leaving Slack. I’ll need to review Copilot’s work and check whether the moderator actually works as intended.

#### **Fixing the bot with Claude Code**

In addition to my Moderator experiment, Claude helped me fix the AuTomator when it stopped working. One of the messages didn’t get deleted after I added a reaction.

Under normal circumstances, fixing this would have meant spending several hours on:

- Opening CloudWatch
- Searching through logs
- Trying to reconstruct what broke and why
- Manually fixing and redeploying



I didn’t have that time because I was preparing for a family trip. So I handed the task to Claude Code that successfully fixed the issue.

I asked it to fetch the last two hours of logs and figure out what was wrong.

It found 2 problems

- GROQ_API_KEY was missing for ask-ai reactions
- Error when deleting messages that contain curly braces



While I was looking for the new key, it fixed the curly braces issue. Then I gave it the key, and it updated the environment variables for the lambda.

Done. It was fixed while I was packing and getting ready to leave.

All of this happened without opening a browser or clicking through the AWS console.

For me, urgent maintenance, operational tasks, and situations where execution matters more than careful design are where Claude Code fits most. And for slower and more interactive coding, I prefer tools like Cursor, Google Antigravity, or GitHub Copilot.

### **What I’ve Been Working On Recently**

#### **AI Engineering Buildcamp**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image6.jpg"  alt="Markdown checklist listing LLM alternatives (OpenAI, Groq, Anthropic, Amazon Bedrock, Gemini, Z.ai, Grok, Ollama) with file path links and status." />
<figcaption>We wrapped up Module 1 of the AI Engineering Buildcamp, which I fully reworked and re-recorded. I shifted the focus from high-level introductions to concrete engineering decisions. The module now covers RAG fundamentals using real documentation, structured output as a first-week topic, working with streaming and partial responses, and a new, extended section on alternatives to OpenAI.</figcaption>
</figure>

#### **A New Project for AI Engineering Buildcamp**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image10.jpg"  />
<figcaption>I also started working on a completely new project that will be part of the AI Engineering Buildcamp. It focuses on extracting structured information from a mathematics textbook published in the 1920s. The book has partial digitization and OCR, but the quality is poor.</figcaption>
</figure>

The project walks through how to reliably extract usable, structured data from scanned PDFs using modern LLM-based tools. This topic is especially relevant right now because, while analyzing AI engineer take-home assignments, I keep seeing document extraction from PDFs come up repeatedly.

#### **In-Person Events**

This year at DataTalksClub, we are putting more emphasis on offline events.

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image12.jpg"  alt="GenAI transforming Engineering: Agents and Guardrails [IN-PERSON!]" />
<figcaption>On February 17, we are hosting an <a href="https://www.meetup.com/berlin-datatalks-club/events/312876899/">in-person meetup at Zalando in Berlin</a>, focused on agents and guardrails in real engineering systems. I will talk about how modern code agents are structured and what actually matters in practice, and Zalando engineers will share how they built a guardrailed internal support agent for incident triage and stakeholder Q&amp;A. There will be pizza, drinks, and time to talk after the sessions!</figcaption>
</figure>

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image9.jpg"  alt="Hands-On Data Engineering: From Zero to Billion-Row Analytics [IN-PERSON!]" />
<figcaption>A few weeks later, on March 10, I’ll host a <a href="https://www.meetup.com/en-au/berlin-datatalks-club/events/313061198/?eventOrigin=group_upcoming_events">hands-on data engineering workshop</a> at Exasol Xperience 2026. We will work through a full, realistic pipeline using Exasol Personal on AWS, ingest and clean more than 1 billion rows of NHS prescription data, and finish with an AI-powered analytics dashboard for fast exploration.</figcaption>
</figure>

Members of the DataTalksClub community can [attend the conference for free](https://www.exasol.com/events/exasol-xperience/registration/){:target="_blank"} using the code EXA-VIP-RDTC.

#### **DataTalksClub Workshops**

We have two free upcoming workshops that I’ll host.

[“What’s Your Agent GPA?”](https://luma.com/ttrh70g8){:target="_blank"} focuses on evaluating AI agents. We will build two versions of the same agent using Snowflake Managed MCP and then compare them end-to-end using TruLens. You’ll understand how agents choose tools, how tool descriptions affect behavior, and how to measure whether one version is actually better than another.

dltHub is returning to Data Engineering Zoomcamp with a [new workshop](https://luma.com/hzis1yzp){:target="_blank"}. The focus is on production workflows: using LLMs to speed up pipeline development, validating data and schemas via the dlt dashboard and MCP, and running dlt reliably in production.

### **Special Project: AI Engineer Role Research**

Even though more and more “AI Engineer” job titles are appearing in 2026, the role itself is still poorly defined and varies widely across companies.

I decided to start my own research on how the AI engineer role is defined, how interviews are conducted, and how take-home assignments are evaluated today.

To ground this in real data, I analyzed more than 1,500 job descriptions and numerous public repositories. I’m also collecting input from recent candidates and people who already work in this position.

> If you recently interviewed for AI Engineer role or work on this position and want to share your experience, please ping me at alexey@datatalks.club.

I’ll share the results of my analysis in a three-part live event series on Zoom:

#### **1. Defining the AI Engineer Role**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image3.png"  alt="Event image" />
<figcaption>📅 Tue, Feb 24, 2026 · 🕖 5:00 PM CET</figcaption>
</figure>

How companies describe the role, how AI engineers differ from ML researchers, and what day-to-day work typically involves.

[Register here](https://maven.com/p/f0cada/defining-the-ai-engineer-role){:target="_blank"}

#### **2. AI Engineering Interviews**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image1.png"  alt="Event image" />
<figcaption>📅 Tue, Mar 3, 2026 · 🕖 5:00 PM CET</figcaption>
</figure>

Real interview questions, how candidates are expected to explain architectural and model decisions, and the kinds of coding and system design tasks that appear in practice.

[Register here](https://maven.com/p/69550a/ai-engineering-the-interview-process){:target="_blank"}

#### **3. AI Engineering Take-Home Assignments**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image2.png"  alt="Event image" />
<figcaption>📅 Mon, Mar 9, 2026 · 🕖 6:00 PM CET</figcaption>
</figure>

Review real take-home assignments from late 2025 and early 2026, discuss what reviewers actually evaluate, and walk through an end-to-end document processing task.

[Register here](https://maven.com/p/250595/ai-engineering-take-home-assignments){:target="_blank"}

### **My Experiment: Certificate Automation**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image8.jpg"  alt="Certificate generated by ChatGPT" />
<figcaption>Initial certificate created by ChatGPT (this is the image I wanted to reproduce with HTML and CSS)</figcaption>
</figure>

After running a two-day workshop in Berlin, I needed to generate and host shareable certificates. I started by asking ChatGPT to generate a certificate image. I liked the result, but I needed something editable, so the next step was to turn that image into an HTML and CSS template where names could be swapped programmatically.

I used Claude Code to translate the reference image into a template. Getting to a usable result took a lot of iteration. I had to repeatedly review and correct layout details, spacing, and typography until the template was good enough for production. Even then, it wasn’t a faithful copy of the original image.

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image11.jpg"  alt="Certificate recreated by Claude" />
<figcaption>Certificate recreated by Claude using HTML+CSS on top of ChatGPT's background</figcaption>
</figure>

I tried to automate this further by using Gemini as an evaluator for Claude’s output, but that approach did not work well. The evaluation feedback was inconsistent, and the similarity scores overestimated visual quality, making them unreliable.

> I’ll write about this project in a more detail in the next newsletter editions. Subscribe to stay tuned!

### **Interesting Resources**

<figure>
<img src="/images/posts/2026-03-05-building-and-maintaining-slack-moderation-bot-for-88k-member-community/image7.jpg"  />
<figcaption>CS336: Language Modeling from Scratch website</figcaption>
</figure>

- [**CS336: Language Modeling from Scratch**](https://stanford-cs336.github.io/spring2025/){:target="_blank"}: an implementation-heavy course from Stanford University that walks through building a language model end to end, from data processing and tokenization to training, systems optimization, scaling laws, and alignment. The publicly available materials include Python-based lecture scripts and slide decks, five substantial programming assignments with public leaderboards, detailed handouts, example and starter code, and a full course schedule.

<!-- -->

- [**planning-with-files**](https://github.com/othmanadi/planning-with-files){:target="_blank"}: a Claude Code skill that turns long, complex tasks into a file-based workflow using persistent Markdown files. Instead of keeping plans, progress, and errors in the model’s context, it stores them on disk, which helps prevent goal drift, forgotten decisions, and repeated mistakes. It is especially useful for multi-step work, research, and agent-driven projects that span many tool calls or sessions.

- [**CLAUDE_CODEX_SKILL**](https://gist.github.com/antirez/2e07727fb37e7301247e568b6634beff){:target="_blank"}: a workflow that shows how to use the OpenAI Codex CLI for deep, non-interactive debugging using a file-based question and answer workflow. You write a detailed problem description and full code context into a file, then let Codex analyze it and produce a structured written analysis. It is especially useful for subtle bugs, spec-driven logic, and situations where standard chat-based prompting is insufficient.

Thanks for reading Alexey On Data! Subscribe for free to receive new posts and support my work.

Edited by [Valeriia Kuka](https://www.linkedin.com/in/valeriia-kuka/){:target="_blank"}