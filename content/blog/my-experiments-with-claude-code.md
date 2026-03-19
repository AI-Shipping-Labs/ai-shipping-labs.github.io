---
title: "Experiments with Claude Code: Slash Commands and Persistent Coding Loops"
description: "I built funny projects with custom Claude Code slash commands (/kid and /parent), then explored stop hooks, the Ralph Wiggum plugin, and a Python-based continue loop to keep Claude coding continuously."
date: "2026-01-09"
tags: ["ai", "claude-code", "slash-commands", "persistent-coding-loops"]
author: "Alexey Grigorev"
---

A few weeks ago I came across [Claude Life Assistant](https://github.com/lout33/claude_life_assistant/tree/5dbef44d6f860bb7d477c4000b1ce88bc31464e0), “a personal coach that lives in your filesystem”. I looked at the Quick Start and wondered, “What are these commands?”

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image3.png"  />
<figcaption>So I decided to figure it out.</figcaption>
</figure>


I discovered that these commands are defined in a very simple way: you add a markdown file to the .claude/commands folder and describe what the command should do, in plain text.

## Kid and Parent commands

Out of curiosity, I created a new project two commands: /kid and /parent.

[The kid](https://raw.githubusercontent.com/alexeygrigorev/claude-code-kid-parent/refs/heads/main/.claude/commands/kid.md) comes up with a completely random, often absurd project idea. [The parent](https://raw.githubusercontent.com/alexeygrigorev/claude-code-kid-parent/refs/heads/main/.claude/commands/parent.md) takes that idea and implements it in HTML+JavaScript. Then the process repeats: kid asks, parent builds.

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image6.jpg"  />
<figcaption>I asked Claude to run this in a loop, and as a result, it created a lot of funny projects. Here’s the <a href="https://github.com/alexeygrigorev/claude-code-kid-parent">repository</a> with the code.</figcaption>
</figure>

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image7.jpg"  />
<figcaption>There are now more than 25 projects. Most of them are standalone HTML files with embedded CSS and JavaScript. There are no external dependencies. You can open the HTML files directly in a browser. Of course, <a href="https://alexeygrigorev.com/claude-code-kid-parent/projects/judgy-crystal-ball.html">I published it as GitHub Pages</a>.</figcaption>
</figure>

Other projects: Invisible Pet Walker with awkwardness meters, a Sneeze Simulator with randomized power levels, a Garden of Weird Plants with personalities, a Silly Symphony built on the Web Audio API, and a Robot Chef that invents bizarre dishes.

## Ralph Wiggum: Running Claude Code Forever

I asked Claude to run the /kid and /parent commands forever. But it didn’t. After a few iterations, it stopped, so I had to ask it to continue repeatedly.

I wondered whether I could make it run without my involvement. The answer is yes: [with stop hooks](https://code.claude.com/docs/en/hooks). I got very excited, and copied the example from the docs, only to find out that [the documentation was outdated and the prompt hooks didn’t work](https://github.com/anthropics/claude-code/issues/11786#issuecomment-3543716217).

Eventually I found the plugin called [“Ralph Wiggum”](https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/README.md). That’s a boy from *The Simpsons* (the son of the police chief) who’s “persistent despite setbacks”. It automatically prompts Claude to continue when it stops.

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image9.jpg"  />
<figcaption>Ralph Wiggum is “the future of AI coding”, according to some YouTubers (I haven’t checked the video though)</figcaption>
</figure>

Use the /plugin command to install it:

/plugin install ralph-wiggum

And now you run it:

/ralph-wiggum:ralph-loop "prompt"

I tested on another project: a metabolism simulator. I want to know how metabolism in the human body works, so I thought a simulator would help me understand this topic better.

I gave it an initial prompt, asked it to plan the app, and then activated the loop:

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image5.jpg"  />
<figcaption>Sadly, Ralph stops on my computer. It’s <a href="https://github.com/anthropics/claude-code/blob/main/plugins/ralph-wiggum/hooks/hooks.json#L9">implemented as a Bash command</a> (without prefixing it with “bash”), and it wouldn’t execute properly on Windows.</figcaption>
</figure>

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image8.jpg"  />
<figcaption>Claude saying that the Ralph loop will continue - but it’s not doing anything</figcaption>
</figure>

But if you’re on Mac or Linux - it should work.

## My Own Ralph with Python

But I thought “what if I implemented it with Python?”

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image1.jpg"  />
<figcaption>Nano Banana made Ralph pet a python</figcaption>
</figure>

And it worked! Steps:

- Create a stop hook in .claude/settings.json with type command and command python .claude/continue-hook.py
- Add continue-hook.py and continue.md to the .claude folder
- If you want to stop the loop, remove or rename continue.md



See the code [here](https://github.com/alexeygrigorev/metabolism-simulator/tree/master/.claude).

Another problem: Claude Code sometimes fails and exits with an error. I don’t know why it happens.

<figure>
<img src="/images/blog/2026-03-05-my-experiments-with-claude-code/image10.jpg"  />
<figcaption>Claude Code exiting with error after almost 6 hours of non-stop working</figcaption>
</figure>

To fight it, I created [a script that continues running it](https://github.com/alexeygrigorev/metabolism-simulator/blob/master/continue.sh) after it stops, so it can run indefinitely (until my Windows decides to install an update and reboot).

After a few days it created a nice-looking website with a lot of features. Not everything worked but I’m sure it’s fixable. Here’s what it created:

It’s a fun idea, but I wouldn’t let it run loose on any of my real-life projects. I want to steer it in the right direction and force it to follow the best engineering practices. At times it’s very sloppy and lazy: instead of fixing a test, it may simply delete it “because it’s an existing regression”.

I used Claude Code (without the Ralph loop) for a few other projects, and I switched from Opus to GLM-4.7 from Z.ai. I’ll write more about my experience with Claude Code in the next posts.