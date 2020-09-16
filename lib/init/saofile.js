module.exports = {
  prompts() {
    return [
      {
        name: "project",
        message: "please input project name",
        filter: (val) => val.toLowerCase(),
        validate: function (input) {
          const result = /^[0-9a-zA-z\-\_]*$/.test(input);
          if (!result) {
            return "只能输入字母数字和-_";
          } else {
            return true;
          }
        },
      },
      {
        name: "description",
        message: "description project",
      },
    ];
  },
  actions: [
    {
      type: "add",
      files: "**",
    },
    {
      type: "move",
      patterns: {
        yarnrc: ".yarnrc",
        prettierignore: ".prettierignore",
        npmrc: ".npmrc",
        gitignore: ".gitignore",
        "eslintrc.js": ".eslintrc.js",
        eslintignore: ".eslintignore",
      },
    },
  ],
  async completed() {
    this.showProjectTips();
  },
};
