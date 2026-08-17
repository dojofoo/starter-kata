# Starter TypeScript

A minimal TypeScript reference course for learning how to set up a dojo with Dojofoo.
It explicitly uses the `katas` course mode. For the authored presentation and
question flow, see the sibling `dojofoo/starter-interactive` template.

## Try the dojo

```sh
npx dojofoo install
npx dojofoo add dojofoo/starter-kata
```

Then run `/kata` in your configured coding agent or start `npx dojofoo ui`.

## Use it as an authoring template

1. Use this repository as a GitHub template or copy it into a new repository.
2. Rename the package metadata and documented `dojo.yaml` manifest.
3. Replace the course description and `DOJO.md` teaching rules.
4. Replace the sample katas while retaining their file contract.
5. Run the kata tests against private reference implementations, restore the learner scaffolds, then run `npm pack --dry-run` before publishing.

Every kata contains:

- `KATA.md` — the learner-visible goal and contract.
- `SENSEI.md` — private teaching prompts, test map, pitfalls, and completion bridge.
- `solution.ts` — the only file the learner edits.
- `solution.test.ts` — deterministic checks consumed by the dojofoo reporter.

The package intentionally contains no completed solutions.

## Required package contract

- `dojo.yaml` defines ordered kata templates and runner behavior, with comments
  that explain the authoring contract inline. JSON remains supported.
- `mode: "katas"` makes the course's learning contract explicit. Older kata
  manifests that omit it remain compatible.
- `mise.toml` pins the runtime and exposes the conventional `setup` task that
  dojofoo runs before executable course work.
- `DOJO.md` defines course-wide teaching boundaries.
- `skills/` contains optional domain context linked into supported harnesses.
- `vitest.config.ts` aliases learner work from the host project's `katas/` directory.
- The npm `files` allowlist includes only material learners and agents need.

Keep tests deterministic, keep learner briefs free of answers, and make every `SENSEI.md` useful without requiring the agent to infer the lesson design.

The GitHub repository is the source of truth. A successful public install reports its canonical repository and resolved commit to dojofoo; the service fetches and validates `dojo.json` before indexing it. Once indexed, the short name can resolve through the marketplace without a registry pull request.

Updates use the same source identity:

```sh
npx dojofoo update dojofoo/starter-kata
```

Updating replaces the installed course material only. Learner work, progress, discussions, and notes remain in the project.
