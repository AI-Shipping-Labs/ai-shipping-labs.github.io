---
title: "SQLiteSearch: Lightweight Text and Vector Search Library in Python"
description: "Learn how I built SQLiteSearch, a lightweight, single-file Python library for fast text and vector search with SQLite (no Docker)."
date: "2026-02-20"
tags: ["ai", "search", "python", "library"]
author: "Alexey Grigorev"
---

Recently, I was looking for a compact Python search library that provides reliable search functionality without requiring a full-scale infrastructure.

I needed a solution that was local, easy to integrate into small projects, and persistent. I already had [minsearch](https://github.com/alexeygrigorev/minsearch/), which met the first two requirements but stored everything in memory and lacked persistence. After reviewing the available options, I realized no solution fully matched my requirements.

<figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image9.png"  />
<figcaption>So I built <a href="https://github.com/alexeygrigorev/sqlitesearch">SQLiteSearch</a>, a lightweight, pure-Python search library that supports both text and vector search. It stores all data in a single file using SQLite, an open-source relational database included with the Python standard library.</figcaption>
</figure>

In this post, I’ll explain the building process, how I came up with the final configuration of the system and evaluated existing solutions with ChatGPT, why they were insufficient, how SQLiteSearch is structured internally, its benefits, and what my workflow looked like for publishing it as a PyPI package.

## Background

The concept for the SQLiteSearch library emerged from the need for a persistent, lightweight search library that AI Engineering Buildcamp course participants can use in one of their projects.

<figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image12.png"  />
<figcaption>I already have a lightweight library called <a href="https://github.com/alexeygrigorev/minsearch">minsearch</a> that supports text and vector search with an easy-to-use API. However, it only works in memory. This means that when I close the Python process running it, all the indexed data disappears. I have to rebuild the index each time I restart the application.</figcaption>
</figure>

This works in some cases, but I wanted to show how to build a data ingestion pipeline that operates independently of the RAG agent. So I needed a lightweight and persistent search engine.

## My Requirements

I wanted a search library that meets these criteria:

- Available in Python
- Easy to set up and interact with
- Runs locally, eliminating the need for Docker (allowing use in environments like Google Colab)
- Support both regular text search and vector search



Existing solutions, such as running Elasticsearch, are not always a good fit for small-scale problems. They cost $200+ per month and are designed for large-scale production systems. There are cheaper options like Qdrant or PostgreSQL, but if I were to use them, I’d need to rely on an external service or run them in Docker.

So I decided to do my own research with ChatGPT. In cases like that, when I want to find something but it’s not yet very clear in my head exactly what I need, and I’m not sure whether a solution to my problem already exists, I turn to ChatGPT to brainstorm ideas and interact with it in dictation mode.

## Research Phase

I shared my requirements with ChatGPT and asked it to find a solution.

Eventually, it suggested using SQLite's text search. I like SQLite because it’s embedded in Python and satisfies most of my requirements. But I also wanted to have vector search, which it didn’t support out of the box. So I started looking for vector search options that work with SQLite.

Here’s what ChatGPT found:

<figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image5.png"  />
<figcaption>ChatGPT research results showing existing locality-sensitive hashing (LSH) libraries and their limitations</figcaption>
</figure>

Results were:

- lshashing: Pure Python LSH library, but keeps hash tables in memory, not SQLite
- SparseLSH: Supports multiple storage backends (Redis, LevelDB, BerkeleyDB) but not SQLite
- narrow-down: Supports SQLite backend but uses a native Rust extension, not pure Python



None of the existing solutions met all requirements, so I decided to create a new library.

## Implementation

I continued my conversation with ChatGPT to brainstorm solutions and iterate on the design.

I also added a requirement that the library should use locality-sensitive hashing (LSH), one of the original techniques for producing high-quality search results while maintaining lightning-fast search speeds. I already understand how LSH works because I have implemented random projections a few times, so I chose it for vector search instead of more advanced, complex techniques. If I need to debug something, I want to make sure I understand what’s happening and can fix the problem without relying on an AI assistant.

To make the library easy to interact with, I also asked ChatGPT to make sure the library exposes a simple API that closely resembles minsearch, so that the AI Engineering Buildcamp participants wouldn't have to learn a new interface.

As a result, ChatGPT prepared the implementation plan that included everything that I discussed with it. The library is called “lightsearch,” but I later renamed it to "SQLiteSearch" before publication because "litesearch" was already taken on PyPI.

<figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image3.png"  />
<figcaption>The technical plan for LightSearch shows the two-stage retrieval approach using SimHash and banding</figcaption>
</figure>

Then I asked ChatGPT to save the plan as a [summary.md](http://summary.md) file and asked Claude Code to read it and build the library based on it.

### <figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image2.png"  />
<figcaption>ChatGPT prepared a summary.md document that would become the basis for implementation</figcaption>
</figure>

I created a GitHub repository, added the plan document (renamed from summary.md to plan.md), and instructed Claude to read the plan and start implementing. I reminded Claude to include tests, which are important for library quality.

<figure>
<img src="/images/blog/2026-03-05-sqlitesearch-lightweight-search-solution/image1.png"  />
<figcaption>Claude Code is reading the plan.md file and beginning implementation with questions about the approach</figcaption>
</figure>

The complete process from idea to implementation involved these steps:

1.  Asking ChatGPT about existing solutions to understand how they’re built

2.  Iterating on the approach based on my prior knowledge of LSH (Locality-Sensitive Hashing)

3.  Asking ChatGPT to design the API to closely resemble minsearch, so that the AI Engineering Buildcamp participants wouldn't have to learn a new interface

4.  Asking ChatGPT to create a summary of the agreed-upon approach

5.  Having ChatGPT create a detailed plan document based on the summary from the previous step

6.  Using Claude Code to review the plan and carry out the implementation

## Final Solution

SQLiteSearch stores the entire search index in a single SQLite database file on disk, unlike server-based systems (e.g., PostgreSQL, Elasticsearch). This single file contains your data tables, index structures for fast lookup, and search metadata.

SQLite requires no separate server process. It runs within your Python process, reading and writing to the file directly, eliminating network communication, background daemons, and distributed setup.

This makes SQLiteSearch lightweight. You install the package and start using it. There is no cluster management, JVM tuning, or DevOps overhead.

SQLiteSearch is particularly well-suited for small personal and course projects where persistent search and minimal operational complexity are important. Some providers (e.g., Render) allow hosting SQLite so that you can take advantage of it in your personal projects.

Conceptually, it sits between minsearch and production-ready search engines like Elasticsearch or Qdrant.

> You can read more about the architecture of the SQLiteSearch in the GitHub repository: [https://github.com/alexeygrigorev/sqlitesearch](https://github.com/alexeygrigorev/sqlitesearch)

## Release Workflow for the Publication to PyPI

I maintain a few Python libraries on PyPI and sometimes create new ones. To make my life easier, I created a [/release](https://github.com/alexeygrigorev/.claude/blob/main/commands/release.md) Claude code command to automate the entire publishing process for Python packages. I also have a similar one for starting a new project ([/init-library](https://github.com/alexeygrigorev/.claude/blob/main/commands/init-library.md)): it creates a pyproject.toml, Makefile with build and publish targets, command line interface, tests, and CI/CD.

If anything fails, Claude diagnoses the issue, updates the configuration or tests, and reruns the pipeline until the package builds cleanly. Once everything passes, publishing is reduced to a single prompt in Claude Code. The process is structured, repeatable, and largely automated, with Claude acting as a workflow executor and validator.
