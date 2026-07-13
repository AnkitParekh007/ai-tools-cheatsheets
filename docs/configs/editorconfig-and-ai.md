# EditorConfig and AI

`.editorconfig` still matters in AI-heavy repositories because agents often imitate nearby formatting. A clear formatting baseline reduces noisy diffs and makes AI output easier to merge.

## Why It Still Matters

EditorConfig's official docs say it helps maintain consistent coding styles across editors and IDEs. That same consistency also helps coding agents avoid inventing formatting that fights the repository.

## What EditorConfig Gives You

- consistent indentation
- consistent line endings
- consistent charset and trailing-newline behavior
- fewer style-only diffs from human or AI edits

## File Format Basics

The official file-format docs say EditorConfig uses an INI-like format with glob-based section names.

Example:

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

## Why This Helps AI Tools

Even when a tool does not explicitly parse `.editorconfig`, the file still helps because:

- many editors apply it before the AI writes changes
- the surrounding repo becomes more consistent
- generated diffs are less likely to fight formatter or reviewer expectations

## Team Recommendation

For AI-friendly repos:

- keep one root `.editorconfig`
- match your actual formatter settings
- make Markdown exceptions explicit
- prefer LF unless your repo has a clear Windows-specific reason otherwise

## Common Mistakes

- setting values that conflict with your formatter
- forgetting Markdown trailing-whitespace exceptions
- assuming `.editorconfig` replaces tool-specific formatters

It does not replace Prettier, ESLint, or language-specific formatters. It gives them and your agents a stable baseline.

## Sources

- https://editorconfig.org/
- https://spec.editorconfig.org/index.html
- https://docs.editorconfig.org/en/master/editorconfig-format.html
