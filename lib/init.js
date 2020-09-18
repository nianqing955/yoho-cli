const inquirer = require("inquirer");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const Promise = require("bluebird");
const download = Promise.promisify(require("download-git-repo"));
const spinner = ora("正在下载模板...");

function inquirerFn() {
  return inquirer.prompt([
    {
      type: "list",
      name: "frame",
      message: "请选择开发用的脚手架:",
      choices: ["react", "vue"],
    },
    {
      type: "input",
      name: "name",
      message: "请输入项目名称:",
    },
    {
      type: "input",
      name: "description",
      message: "请输入项目简介:",
    },
  ]);
}

function downloadFn(answers, dirname) {
  const { frame, name = dirname, description = dirname } = answers;
  // 从github上找了两个star比较多的脚手架模版,一个react,一个vue
  let url = "https://github.com:bodyno/react-starter-kit#master";
  if (frame === "vue") {
    url = "https://github.com:Mrminfive/vue-multiple-page#master";
  }
  spinner.start();
  download(url, dirname, { clone: false })
    .then(() => {
      spinner.stop(); // 关闭loading动效
      console.log(chalk.green("download template success"));
      // 重写package中的name、description等项目信息
      const pkg = process.cwd() + `/${dirname}/package.json`;
      const content = JSON.parse(fs.readFileSync(pkg, "utf8"));
      content.name = name;
      content.description = description;
      const result = JSON.stringify(content);
      fs.writeFileSync(pkg, result);
    })
    .catch((err) => {
      spinner.stop(); // 关闭loading动效
      console.log(chalk.red("download template failed"));
      console.log(err);
    });
}

module.exports = {
    inquirerFn,
    downloadFn
}
