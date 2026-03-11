---
title: "What Is an AI Engineer? 2026 Role, Skills and Responsibilities Based on 1,000+ Job Descriptions"
description: "Learn what an AI engineer is in 2026: responsibilities, skills, tools, and real-world use cases based on analysis of 1,000+ AI engineer job descriptions."
date: "2026-03-04"
tags: ["ai-engineering", "ml-engineering", "careers", "llm"]
author: "Alexey Grigorev, Valeriia Kuka"
---

Jan 09, 2026

1

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image2.png"  />
<figcaption>I used Claude Code briefly half a year ago. I didn’t like the terminal experience and preferred to have an AI assistant in my IDE.</figcaption>
</figure>

But recently a lot of people have been talking about Claude Code on social media, so I decided to give it another try.

Even though it hasn’t become my favorite coding agent (it’s still Copilot), I actually enjoyed using it. Here and in the next posts I’ll share with you what I did and what I learned.

### **My Experiments: Claude Commands**

Claude commands are /slash commands that you execute in Claude Code.

A few weeks ago I came across [Claude Life Assistant](https://github.com/lout33/claude_life_assistant/tree/5dbef44d6f860bb7d477c4000b1ce88bc31464e0){:target="_blank"}, “a personal coach that lives in your filesystem”. I looked at the Quick Start and wondered, “What are these commands?”

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image3.png"  />
<figcaption>So I decided to figure it out.</figcaption>
</figure>

### **Kid and Parent commands**

I discovered that these commands are defined in a very simple way: you add a markdown file to the .claude/commands folder and describe what the command should do, in plain text.

Out of curiosity, I created a new project two commands: /kid and /parent.

[The kid](https://raw.githubusercontent.com/alexeygrigorev/claude-code-kid-parent/refs/heads/main/.claude/commands/kid.md){:target="_blank"} comes up with a completely random, often absurd project idea. [The parent](https://raw.githubusercontent.com/alexeygrigorev/claude-code-kid-parent/refs/heads/main/.claude/commands/parent.md){:target="_blank"} takes that idea and implements it in HTML+JavaScript. Then the process repeats: kid asks, parent builds.

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image6.jpg"  />
<figcaption>I asked Claude to run this in a loop, and as a result, it created a lot of funny projects. Here’s the <a href="https://github.com/alexeygrigorev/claude-code-kid-parent">repository</a> with the code.</figcaption>
</figure>

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image7.jpg"  />
<figcaption>There are now more than 25 projects. Most of them are standalone HTML files with embedded CSS and JavaScript. There are no external dependencies. You can open the HTML files directly in a browser. Of course, <a href="https://alexeygrigorev.com/claude-code-kid-parent/projects/judgy-crystal-ball.html">I published it as GitHub Pages</a>.</figcaption>
</figure>

Other projects: Invisible Pet Walker with awkwardness meters, a Sneeze Simulator with randomized power levels, a Garden of Weird Plants with personalities, a Silly Symphony built on the Web Audio API, and a Robot Chef that invents bizarre dishes.

[Leave a comment](https://alexeyondata.substack.com/p/my-experiments-with-claude-code/comments){:target="_blank"}

### **Ralph Wiggum: Running Claude Code Forever**

I asked Claude to run the /kid and /parent commands forever. But it didn’t. After a few iterations, it stopped, so I had to ask it to continue repeatedly.

I wondered whether I could make it run without my involvement. The answer is yes: [with stop hooks](https://code.claude.com/docs/en/hooks){:target="_blank"}. I got very excited, and copied the example from the docs, only to find out that [the documentation was outdated and the prompt hooks didn’t work](https://github.com/anthropics/claude-code/issues/11786#issuecomment-3543716217){:target="_blank"}.

Eventually I found the plugin called [“Ralph Wiggum”](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md){:target="_blank"}. That’s a boy from *The Simpsons* (the son of the police chief) who’s “persistent despite setbacks”. It automatically prompts Claude to continue when it stops.

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image9.jpg"  />
<figcaption>Ralph Wiggum is “the future of AI coding”, according to some YouTubers (I haven’t checked the video though)</figcaption>
</figure>

Use the /plugin command to install it:

/plugin install ralph-wiggum

And now you run it:

/ralph-wiggum:ralph-loop "prompt"

I tested on another project: a metabolism simulator. I want to know how metabolism in the human body works, so I thought a simulator would help me understand this topic better.

I gave it an initial prompt, asked it to plan the app, and then activated the loop:

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image5.jpg"  />
<figcaption>Sadly, Ralph stops on my computer. It’s <a href="https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/hooks/hooks.json#L9">implemented as a Bash command</a> (without prefixing it with “bash”), and it wouldn’t execute properly on Windows.</figcaption>
</figure>

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image8.jpg"  />
<figcaption>Claude saying that the Ralph loop will continue - but it’s not doing anything</figcaption>
</figure>

But if you’re on Mac or Linux - it should work.

### **My Own Ralph with Python**

But I thought “what if I implemented it with Python?”

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image1.jpg"  />
<figcaption>Nano Banana made Ralph pet a python</figcaption>
</figure>

And it worked! Steps:

- Create a stop hook in .claude/settings.json with type command and command python .claude/continue-hook.py
- Add continue-hook.py and continue.md to the .claude folder
- If you want to stop the loop, remove or rename continue.md



See the code [here](https://github.com/alexeygrigorev/metabolism-simulator/tree/master/.claude){:target="_blank"}.

Another problem: Claude Code sometimes fails and exits with an error. I don’t know why it happens.

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image10.jpg"  />
<figcaption>Claude Code exiting with error after almost 6 hours of non-stop working</figcaption>
</figure>

To fight it, I created [a script that continues running it](https://github.com/alexeygrigorev/metabolism-simulator/blob/master/continue.sh){:target="_blank"} after it stops, so it can run indefinitely (until my Windows decides to install an update and reboot).

After a few days it created a nice-looking website with a lot of features. Not everything worked but I’m sure it’s fixable. Here’s what it created:

It’s a fun idea, but I wouldn’t let it run loose on any of my real-life projects. I want to steer it in the right direction and force it to follow the best engineering practices. At times it’s very sloppy and lazy: instead of fixing a test, it may simply delete it “because it’s an existing regression”.

I used Claude Code (without the Ralph loop) for a few other projects, and I switched from Opus to GLM-4.7 from Z.ai. I’ll write more about my experience with Claude Code in the next newsletter.

### **Workshop: Agent Guardrails**

This Tuesday I hosted a workshop about Guardrails. Guardrails are safety checks that run before (input) or after (output) your agent executes.

We created an agent that answers questions about [Data Engineering Zoomcamp FAQ](https://datatalks.club/faq/data-engineering-zoomcamp.html){:target="_blank"}. We used OpenAI Agents SDK and added guardrails to this agent. At the end, I showed how to implement guardrails in frameworks that don’t natively support them using asyncio.

You can find the workshop content [here](https://github.com/alexeygrigorev/workshops/tree/main/guardrails){:target="_blank"}.

### **Workshop: .claude/skills/uv/SKILL.md**

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image4.png"  />
<figcaption>Next week, I’ll host a workshop about Agent Skills. Skills are re-usable prompts and scripts that you put in .claude/skills. The agent discovers them automatically and uses when needed.</figcaption>
</figure>

I analyzed the source of [Open Code](https://opencode.ai/){:target="_blank"} (open-source alternative of Claude Code) to understand how skills work under the hood, so we can implement them together. We will also look at the slash commands and implement them too.

[Register here](https://maven.com/p/1b423c/skills-md-from-scratch-build-a-skill-driven-coding-agent){:target="_blank"}

### **AI Bootcamp Scholarship**

I’m closing the registration for the scholarship application for [AI Bootcamp](https://maven.com/alexey-grigorev/from-rag-to-agents){:target="_blank"} today. If you want to apply, hurry up! Here’s the [form](https://forms.gle/u1SYszg4R6kzdjrS8){:target="_blank"}.

I will contact the selected participants individually. If you applied but weren’t contacted by Monday (January 12), it means you were not selected. In my next email here I will write about the selected participants and explain why I selected them. I won’t mention any names, but I want to give you some visibility about the process.

<figure>
<img src="/images/posts/2026-03-05-my-experiments-with-claude-code/image11.jpg"  alt="Scholarship application page for an AI Bootcamp titled &quot;From RAG to Agents,&quot; detailing course goals, eligibility, fee USD 1,799, and links to apply." />
<figcaption>AI Bootcamp scholarship application form</figcaption>
</figure>

### **My Courses**

- **[AI Bootcamp (New Cohort)](https://maven.com/alexey-grigorev/from-rag-to-agents){:target="_blank"}:** the new iteration of AI Bootcamp starts on January 26. I got a lot of feedback and reworked the curriculum, so the next cohort is going to be even better!

- **[AI Agents Email Crash-Course (Cohort Edition)](https://alexeygrigorev.com/aihero/){:target="_blank"}:** I’m running a free cohort-based version of the AI Agents Email Crash-Course this December and January. To complete the cohort, you’ll finish the project and review three other submissions; in return, you’ll receive a certificate of completion signed by me.

- **[Data Engineering Zoomcamp](https://github.com/DataTalksClub/data-engineering-zoomcamp){:target="_blank"}:** New cohort starts on January 12, 2026. A free 9-week course on building production-ready data pipelines: ingestion, orchestration, warehousing, analytics, and more.

### **Interesting Resources**

- **[Agentic AI Crash Course](https://github.com/aishwaryanr/awesome-generative-ai-guide/tree/main/free_courses/agentic_ai_crash_course){:target="_blank"}:** a free, introductory crash course on agentic AI that explains how modern AI agents work in practice, from tools and RAG to memory, planning, MCP, and multi-agent systems. It is designed as a clear, realistic starting point, focusing on real-world system design and limitations rather than hype or guaranteed outcomes.

- **[Assignments for CS146S: The Modern Software Developer](https://github.com/mihail911/modern-software-dev-assignments?tab=readme-ov-file){:target="_blank"}:** a repository that hosts the programming assignments for CS146S: The Modern Software Developer, a Stanford University course focused on AI-assisted software development. It supports hands-on work with modern tooling and workflows, including LLM-based coding, testing, and documentation, aligned with the course taught in Fall 2025.