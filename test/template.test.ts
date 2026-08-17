import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parse as parseYaml } from "yaml";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("@dojofoo/starter-kata", () => {
  it("is a standalone GitHub-installable dojo", () => {
    const packageJson = JSON.parse(read("package.json"));
    const manifest = parseYaml(read("dojo.yaml"));

    expect(packageJson).toMatchObject({
      name: "@dojofoo/starter-kata",
      repository: {
        type: "git",
        url: "https://github.com/dojofoo/starter-kata.git",
      },
    });
    expect(manifest).toMatchObject({
      name: "@dojofoo/starter-kata",
      repository: "https://github.com/dojofoo/starter-kata",
      runner: { adapter: "vitest", coverage: true },
      test: "npx vitest run {template}",
    });
    expect(manifest.katas).toHaveLength(3);
  });

  it("contains the complete teaching contract without answer files", () => {
    const manifest = parseYaml(read("dojo.yaml"));
    for (const kata of manifest.katas) {
      const directory = resolve(root, kata.template, "..");
      for (const file of ["KATA.md", "SENSEI.md", "solution.ts", "solution.test.ts"]) {
        expect(existsSync(resolve(directory, file))).toBe(true);
      }
    }
    expect(existsSync(resolve(root, "skills/starter-sensei/SKILL.md"))).toBe(true);
    expect(read("DOJO.md")).toContain("Never give solutions");
  });
});
