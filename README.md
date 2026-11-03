# wp-plugin-base-skill

Agent skill (Agent Skills 1.0 format — works with Codex, Vibe and compatible
agents) for the lifecycle of projects generated from
[quasipapa/wp-plugin-base](https://github.com/quasipapa/wp-plugin-base):

- **create** — scaffold a new plugin repo from the template and initialize it
- **audit** — detect drift between a project and its locked base version
- **upgrade** — absorb a base release into a project as a pull request

The template repository remains the authoritative source; this skill is a thin
wrapper around its scripts (`init-template.mjs`, `base-audit.mjs`,
`base-upgrade.mjs`).

## Install

```bash
npx skills add quasipapa/wp-plugin-base-skill
# or copy skills/wp-plugin-base into your agent's project skills dir
# (.vibe/skills/ for Vibe, .agents/skills/ for others)
```

## Usage

See `skills/wp-plugin-base/SKILL.md` and the template's
[using-the-base guides](https://github.com/quasipapa/wp-plugin-base/tree/main/docs/using-the-base).

For generic WordPress development knowledge (blocks, plugins, wp-env, Plugin
Directory guidelines), use
[WordPress/agent-skills](https://github.com/WordPress/agent-skills).

## License

GPL-2.0-or-later.
