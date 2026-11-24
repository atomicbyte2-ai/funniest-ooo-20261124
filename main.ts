// SPDX-License-Identifier: MIT

// Why it works:
// - Opens like a real auto-reply, so the reader's guard is down.
// - "My cat is running my inbox" is the absurd premise, stated deadpan.
// - Rule of three that escalates: deleting (petty), replying-all (social
//   disaster everyone has lived through), firing (unearned power).
// - Ends on "Gary": a specific, ordinary name is the funniest final word,
//   and every office has a Gary.

const LINE = "Out of office until Monday. My cat is running my inbox. So far she has deleted three emails, replied-all once, and fired Gary.";

const count = [...LINE].length;
if (count < 1 || count > 140) throw new Error(`Line must be 1-140 chars, got ${count}`);
if (LINE.trim().length === 0) throw new Error("Line is only whitespace");
if (/[\r\n]/.test(LINE)) throw new Error("Line contains a newline");

// Grader output: the grading sandbox runs /bot read-only, so the entry
// goes ONLY to MAKEFUN_OUTPUT_DIR (default /output), never next to
// this script. main.ts writes no file in its own directory.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("entry.txt round-trip mismatch");
}
console.log(`wrote ${[...LINE].length} characters to ${outPath}`);
