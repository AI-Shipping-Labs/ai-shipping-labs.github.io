---
title: "Telegram Writing Assistant: Claude Code Turns Voice Notes Into Markdown"
description: "Learn how I built a Telegram-based writing assistant that uses Claude Code to transcribe voice notes and convert brain dumps into structured Markdown, saved and versioned in a GitHub repo."
date: "2026-01-30"
tags: ["ai-tools", "telegram", "markdown", "assistant"]
author: "Alexey Grigorev"
---

I work on many projects, and most of the work happens before anything becomes public. This includes early thinking, small experiments, and intermediate workflows that usually disappear once a final result is ready.

That means you can only see the final results of my work: finished projects, talks, or materials. Everything that led to them remains invisible.

As I started this Substack, I realized I want to share my background work too because it’s an important part of what I do. It helps you understand how I approach my projects and, hopefully, gives you new ideas.

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image8.jpg"  />
<figcaption>Repository with my <a href="https://github.com/alexeygrigorev/telegram-writing-assistant/tree/master">Telegram-based writing assistant</a></figcaption>
</figure>

To help myself capture that background work, I built a [Telegram-based writing assistant](https://github.com/alexeygrigorev/telegram-writing-assistant/tree/master) using Claude Code agents. It can process my raw voice notes, files, and text messages into structured articles and store them in a GitHub repository.

I want to explain how I built the system, how it works, and how you can adapt the same approach for your own workflow.

## Origin Story

Initially, when I started recording ideas using Telegram as a brain dump, there was no assistant to help me. I just created a new chat for my team and me, and collected my ideas there so we could use them to produce content. That was a great starting point and a key factor in creating the [first editions of this newsletter](https://alexeyondata.substack.com/).

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image12.jpg"  />
<figcaption>Initial Telegram chat where I dumped my ideas</figcaption>
</figure>

But it had one limitation: manual processing. Over time, my Telegram became overloaded with voice notes that quickly piled up into a long, unstructured list of raw materials. Some pieces belonged to the same topic. Others were partial thoughts, corrections, or follow-ups.

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image14.jpg"  />
<figcaption>We had a lot of pending voice messages, files, and screenshots to process before publishing a new edition of the newsletter. At some point, it was hard to categorize them and required back-and-forth switching between voice messages, links, and files. That created additional friction for content creation.</figcaption>
</figure>

Turning this stream into something structured required rereading, sorting, and stitching everything together by hand. This was slow and mentally expensive.

This is how I started thinking about how to handle an incoming stream of background work so it can be organized and transformed into pieces I could share publicly.

## How I Implemented the Telegram Assistant

I had an initial vision for how the assistant should work and decided to iterate on it using ChatGPT.

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image6.jpg"  />
<figcaption>Repo structure suggested by ChatGPT</figcaption>
</figure>

I recorded voice messages, discussed the workflow, and refined the process description until it was clear enough to write down. At the end, I asked ChatGPT to save our conversation as a [summary.md](https://github.com/alexeygrigorev/telegram-writing-assistant/blob/master/SUMMARY.md) file, which became the system specification. It was initially in Russian, but I translated it into English for you.

I usually use ChatGPT to refine my vision before starting any new project. It helps me to better understand what I want to build and how I want to do it.

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image4.jpg"  />
<figcaption>Workflow suggested by ChatGPT</figcaption>
</figure>

I didn’t want to implement the system described in summary.md myself. Instead, I asked the Claude Code agent to follow that description and build it. This produced the first working version.

Claude created a Telegram bot that lives in my chat and connected it to a GitHub repository that stores the specification and all subsequent updates from the chat.

I then tested the system by using it as intended: sending messages and recording improvement ideas as voice notes, without leaving the same workflow I was trying to optimize. Claude processed those messages and updated the system.

Here is what the final version looks like.

## How the Final Version Works

Telegram Assistant follows this workflow:

### 1. Capturing

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image3.jpg"  />
<figcaption>Telegram Chat</figcaption>
</figure>

All interaction starts in a Telegram chat. I send text messages, voice notes, images, or files to the bot. Everything is saved locally on my laptop as raw input.

### 2. Processing

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image7.jpg"  />
<figcaption>How I run /process command and the assistant processes a new batch of input</figcaption>
</figure>

When I run the /process command, the assistant reads all accumulated materials as a batch. For each item, it decides whether the content belongs to an existing article or should start a new one. Articles are updated incrementally rather than regenerated from scratch.

### 3. Versioning and Feedback

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image9.jpg"  />
<figcaption>GitHub commit created by the assistant with a clear description of what was changed</figcaption>
</figure>

Once processing is complete, all changes are committed to a GitHub repository. The commit is created by the assistant. It shows what it changed and why. The agent also sends a link to the commit back to the Telegram chat.

### 4. Updating the Configuration

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image5.jpg"  />
<figcaption>Here’s how I specify what the assistant needs to extract from the text to collect improvement ideas and issues it has to work on</figcaption>
</figure>

If I need the agent to update its configuration, including the system prompt and the code it’s based on, I can record improvement ideas as voice notes in the same chat. I can also add images if necessary. I then run the /check-tasks command. The assistant processes all the messages in the chat and looks for bug reports, feature suggestions, etc. After that, it updates the prompt or code accordingly, and commits updates to the repository.

## Technical Capabilities

The final version of the assistant combines a small set of focused technical capabilities:

### 1. Voice Transcription

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image15.jpg"  />
<figcaption>How the assistant transcribes voice messages</figcaption>
</figure>

Voice messages are transcribed automatically using Whisper via Groq. After transcription, the original audio files are removed. Only the extracted text is kept and used for further processing. This ensures that all downstream steps operate on text, regardless of how the input was originally captured.

### 2. Image Processing

Images sent to the bot are processed and described using Groq Vision. Each image is then moved into a structured directory under assets/images/{article_name}/. This makes images first-class inputs that can be referenced in articles rather than remaining as detached chat artifacts.

### 3. Multilingual Input Handling

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image10.jpg"  />
<figcaption>The assistant can transcribe my messages in Russian and then translate them into English</figcaption>
</figure>

In practice, voice notes are often recorded in Russian, while articles are written in English. During processing, Claude translates all content into English, which is treated as the target language for articles. This removes language constraints from the capture phase.

### 4. Link Fetching and Summarization

Links dropped into the chat are fetched during processing. Relevant content is summarized and incorporated into the appropriate article, rather than being stored as raw URLs. This keeps external references integrated with the surrounding context.

### 5. Git-Based Orchestration

<figure>
<img src="/images/blog/2026-03-05-how-i-built-telegram-assistant-that-turns-brain-dumps-into-structured-markdown/image2.jpg"  />
<figcaption>How I updated config to do git pull before pushing a new commit to the repo</figcaption>
</figure>

All updates are committed to a GitHub repository. Each processing run results in a concrete diff that shows exactly what changed. The agent can also follow natural-language instructions such as running git pull before processing to ensure it is working with the latest state.