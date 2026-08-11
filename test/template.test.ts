import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");

describe("@dojofoo/starter", () => {
  it("is a standalone GitHub-installable dojo", () => {
    const packageJson = JSON.parse(read("package.json"));
    const manifest = JSON.parse(read("dojo.json"));

    expect(packageJson).toMatchObject({
      name: "@dojofoo/starter",
      repository: {
        type: "git",
        url: "https://github.com/dojofoo/starter.git",
      },
    });
    expect(manifest).toMatchObject({
      name: "@dojofoo/starter",
      repository: "https://github.com/dojofoo/starter",
      runner: { adapter: "vitest", coverage: true },
      test: "npx vitest run {template}",
    });
    expect(manifest.katas).toHaveLength(3);
  });

  it("contains the complete teaching contract without answer files", () => {
    const manifest = JSON.parse(read("dojo.json"));
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
