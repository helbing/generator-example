import chalk from "chalk"
import Generator, {
  GeneratorOptions as BaseGeneratorOptions,
} from "yeoman-generator"

export type IAnswers = {
  /**
   * Name of package.
   *
   * @default - example
   */
  name: string
}

export type GeneratorOptions = BaseGeneratorOptions & {
  /**
   * Name of package.
   */
  name: string
  /**
   * If is true, it will not install dependences.
   */
  isTesting: boolean
}

export default class extends Generator<GeneratorOptions> {
  constructor(args: string | string[], options: GeneratorOptions) {
    super(args, options)

    this.desc("Generate a example.")
  }

  async prompting() {
    return this.prompt<IAnswers>([
      {
        type: "input",
        name: "name",
        default: "example",
        message: "Enter package name(at least 3 characters):",
        validate: (input: string) => {
          return input.length >= 3
        },
      },
    ]).then((answers: IAnswers) => {
      this.options.name = answers.name
    })
  }

  async writing() {
    type item = {
      // template file
      from: string
      // destination file
      to: string
    }

    const items: item[] = [
      {
        from: "index.js.ejs",
        to: "index.js",
      },
      {
        from: "package.json.ejs",
        to: "package.json",
      },
    ]

    const context = {
      name: this.options.name,
    }

    for (const item of items) {
      this.fs.copyTpl(
        this.templatePath(item.from),
        this.destinationPath(item.to),
        context,
      )
    }
  }

  async install() {
    if (this.options.isTesting) {
      return
    }

    this.spawnCommandSync("npm", ["install", "--save", "express"])
  }

  async end() {
    this.log(chalk.yellow("Thanks for using the generator!"))
  }
}
