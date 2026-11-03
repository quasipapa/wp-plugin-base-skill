---
name: wp-plugin-base
description: "Use when creating a WordPress plugin from the wp-plugin-base template (create), or when auditing/upgrading the base-managed files of an existing wp-plugin-base project (audit, upgrade). The template repo quasipapa/wp-plugin-base is the authoritative source."
compatibility: "Agent Skills 1.0. Filesystem-based agent with gh CLI, git and node. Works with Codex, Vibe and other agents supporting SKILL.md."
---

# wp-plugin-base skill

Lifecycle skill for projects generated from
[quasipapa/wp-plugin-base](https://github.com/quasipapa/wp-plugin-base).
The template repository is the authoritative source; this skill is a thin
wrapper. For generic WordPress development knowledge use
[WordPress/agent-skills](https://github.com/WordPress/agent-skills).

## Commands

### create — new plugin from the template

```bash
node skills/wp-plugin-base/scripts/create.mjs \
  --name "My Plugin" --slug my-plugin --author <you> --repo <you>/my-plugin [--public]
```

Steps: `gh repo create` from the template, clone, run the template's
`scripts/init-template.mjs` with the answers, `npm install`, commit.
See [build guide](https://github.com/quasipapa/wp-plugin-base/blob/main/docs/using-the-base/build.md).

### audit — check base drift (read-only)

Inside a derived project:

```bash
node scripts/base-audit.mjs            # or: /wp-plugin-base audit
```

Reports unchanged / locally-modified / missing managed files and the latest
available base release. See
[upgrade guide](https://github.com/quasipapa/wp-plugin-base/blob/main/docs/using-the-base/upgrade.md).

### upgrade — absorb a base release as PR

```bash
node scripts/base-upgrade.mjs --to v1.2.0   # or: /wp-plugin-base upgrade --to v1.2.0
```

Fetches managed files from the base at the target tag, keeps locally modified
files (reported as conflicts), updates `template-meta/base-lock.json`, opens a
PR. CI gate must be green before merge.

## Guardrails

- Never edit base-managed files (see `template-meta/managed-files.txt`) ad hoc.
- Always reference the base by tag (`@vX.Y.Z`), never `@main`.
- Check the project's own version matrix before applying upstream
  WordPress/agent-skills advice (they target WordPress 7.0+).
