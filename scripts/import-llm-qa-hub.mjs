import fs from "fs"
import path from "path"

const workspaceRoot = process.cwd()
const sourceDir = path.join(workspaceRoot, ".tmp-llm-qa-hub", "Interview_QA")
const outDir = path.join(workspaceRoot, "content", "ai-engineer-interview-questions")

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true })
}

function escapeYamlDoubleQuoted(s) {
  return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function stripPromos(lines) {
  const stopPrefixes = [
    "## **",
    "## 🚀",
    "## 👨",
    "## LLM",
    "**☕",
    "--------------------------------------------------------------------------------",
  ]
  const out = []
  for (const line of lines) {
    if (stopPrefixes.some((p) => line.startsWith(p))) break
    if (line.trim().startsWith("![")) continue
    out.push(line.replace(/\s+$/g, ""))
  }
  // trim trailing blanks
  while (out.length > 0 && out[out.length - 1].trim() === "") out.pop()
  return out
}

function parseQaFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8")
  const lines = raw.split(/\r?\n/)
  const cleaned = lines.filter((l) => !l.startsWith("Authored by **"))

  const items = []
  const qRe = /^##\s+📌\s+Q(\d+):\s+(.*)$/

  for (let i = 0; i < cleaned.length; i++) {
    const m = cleaned[i].match(qRe)
    if (!m) continue
    const qNum = Number(m[1])
    const question = m[2].trim()

    // Find "### ✅ Answer"
    let j = i + 1
    while (j < cleaned.length && !cleaned[j].startsWith("### ✅ Answer")) j++
    if (j >= cleaned.length) continue

    // Answer starts after the blank line following the answer header (if any)
    j++
    if (cleaned[j] === "") j++

    const answerLines = []
    while (j < cleaned.length && !cleaned[j].match(qRe)) {
      answerLines.push(cleaned[j])
      j++
    }

    const finalAnswerLines = stripPromos(answerLines)
    const answer = finalAnswerLines.join("\n").trim()
    if (!answer) continue

    items.push({ qNum, question, answer })
  }

  return items
}

function loadAll() {
  const fileNames = fs
    .readdirSync(sourceDir)
    .filter((f) => /^QA_\d+-\d+\.md$/.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const all = []
  for (const f of fileNames) {
    const fp = path.join(sourceDir, f)
    all.push(...parseQaFile(fp))
  }
  all.sort((a, b) => a.qNum - b.qNum)
  return all
}

function writeLicenseCopy() {
  const src = path.join(workspaceRoot, ".tmp-llm-qa-hub", "LICENSE")
  const dest = path.join(outDir, "LLM-Interview-Questions-and-Answers-Hub.LICENSE")
  fs.copyFileSync(src, dest)
}

function writePage(slug, title, description, sectionTitle, sectionIntro, qaItems) {
  const frontmatterLines = []
  frontmatterLines.push("---")
  frontmatterLines.push(`title: "${escapeYamlDoubleQuoted(title)}"`)
  frontmatterLines.push(`description: "${escapeYamlDoubleQuoted(description)}"`)
  frontmatterLines.push("sources:")
  frontmatterLines.push(
    `  - label: "${escapeYamlDoubleQuoted(
      "KalyanKS-NLP/LLM-Interview-Questions-and-Answers-Hub (GitHub)"
    )}"`
  )
  frontmatterLines.push(
    `    url: "https://github.com/KalyanKS-NLP/LLM-Interview-Questions-and-Answers-Hub/tree/main"`
  )
  frontmatterLines.push(
    `  - label: "${escapeYamlDoubleQuoted("Apache-2.0 license (local copy)")}"`)
  frontmatterLines.push(
    `    url: "/content/ai-engineer-interview-questions/LLM-Interview-Questions-and-Answers-Hub.LICENSE"`
  )
  frontmatterLines.push("sections:")
  frontmatterLines.push(`  - id: "${slug}-all"`)
  frontmatterLines.push(`    title: "${escapeYamlDoubleQuoted(sectionTitle)}"`)
  frontmatterLines.push(`    intro: "${escapeYamlDoubleQuoted(sectionIntro)}"`)
  frontmatterLines.push("    qa:")

  for (const item of qaItems) {
    frontmatterLines.push(`      - question: "${escapeYamlDoubleQuoted(`Q${item.qNum}: ${item.question}`)}"`)
    frontmatterLines.push("        answer: |")
    const answerLines = item.answer.split("\n")
    for (const line of answerLines) {
      frontmatterLines.push(`          ${line}`)
    }
  }

  frontmatterLines.push("---")
  frontmatterLines.push("")

  const outPath = path.join(outDir, `${slug}.md`)
  fs.writeFileSync(outPath, frontmatterLines.join("\n"), "utf8")
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Missing source dir: ${sourceDir}`)
    process.exit(1)
  }

  ensureDir(outDir)
  writeLicenseCopy()

  const all = loadAll()
  if (all.length === 0) {
    console.error("No Q&A items parsed.")
    process.exit(1)
  }

  const chunks = [
    { slug: "llm-hub-1-30", start: 1, end: 30 },
    { slug: "llm-hub-31-60", start: 31, end: 60 },
    { slug: "llm-hub-61-90", start: 61, end: 90 },
    { slug: "llm-hub-91-115", start: 91, end: 115 },
  ]

  for (const ch of chunks) {
    const items = all.filter((x) => x.qNum >= ch.start && x.qNum <= ch.end)
    if (items.length === 0) continue
    writePage(
      ch.slug,
      `LLM Interview Questions (Imported) — Q${ch.start}–Q${ch.end}`,
      `Imported interview Q&A from KalyanKS-NLP/LLM-Interview-Questions-and-Answers-Hub (Q${ch.start}–Q${ch.end}).`,
      `Questions ${ch.start}–${ch.end}`,
      "Imported content. Expand each answer to read in full.",
      items
    )
  }

  console.log(`Imported ${all.length} Q&A items into ${outDir}`)
}

main()

