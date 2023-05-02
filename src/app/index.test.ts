/* eslint-disable vitest/expect-expect */

import path from "path"
import { fileURLToPath } from "url"

import { afterAll, beforeAll, describe, test } from "vitest"
import assert from "yeoman-assert"
import helpers, { RunResult } from "yeoman-test"

import Generator, { GeneratorOptions, IAnswers } from "./index"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

describe("Test generator", () => {
  let runResult: RunResult<Generator>
  const name = "helloworld"

  beforeAll(async () => {
    runResult = await helpers
      .create<Generator>(path.join(__dirname, "../../generators/app"))
      .withOptions({
        isTesting: true,
      } as GeneratorOptions)
      .withAnswers({
        name: name,
      } as IAnswers)
  })

  afterAll(() => {
    runResult.cleanup()
  })

  test("Expect index.js is created", () => {
    assert.file("index.js")
  })

  test("Expect package.json is created", () => {
    assert.file("package.json")
  })

  test("Expect package.json have correct name", () => {
    assert.fileContent("package.json", `"name": "${name}"`)
  })
})
