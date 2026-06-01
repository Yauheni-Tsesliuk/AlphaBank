---
name: remove-only
description: >
  Scans Playwright test files and removes all .only modifiers (test.only, test.describe.only, etc.)
  to ensure no tests are accidentally isolated when running the full suite.
  Use when: removing only, removing .only, cleaning up only, stripping only modifier, remove only from tests.
argument-hint: Path to a test file or folder to scan, e.g. "tests/" or "tests/google.spec.ts". Defaults to all spec files if not provided.
---

# Remove .only Modifiers

Finds and removes all `.only` modifiers from Playwright test files without changing any other code.

## What to Replace

| From | To |
|---|---|
| `test.only(` | `test(` |
| `test.describe.only(` | `test.describe(` |
| `test.only.skip(` | `test.skip(` |
| `it.only(` | `it(` |

## Procedure

1. **Locate files** — Use the path provided by the user. If none, use `file_search` with `**/*.spec.ts` and `**/*.test.ts` to find all test files.
2. **Scan for `.only`** — Use `grep_search` with regex `\.only\(` scoped to the target file or folder to find which files contain `.only`.
3. **For each affected file**:
   - Read the relevant lines with `read_file`.
   - Use `multi_replace_string_in_file` to replace all `.only` occurrences in a single call, preserving all surrounding code exactly.
4. **Skip** `.only` inside string literals or comments — only remove from actual call expressions.
5. **Report** — List every file changed and each replacement made (e.g. `test.only(` → `test(` on line X). If no `.only` is found, report the suite is already clean.
