module.exports = {
    rules: {
      "scope-case": [2, "always", "lower-case"],
      "subject-case": [0],
      "subject-empty": [2, "never"],
      "subject-full-stop": [2, "never", "."],
      "type-case": [2, "always", "lower-case"],
      "type-empty": [2, "never"],
      "type-enum": [
        2,
        "always",
        [
          "common", // 通用代码
          "doc", // 文档
          "build", // build
          "revert", // 回退
          "chore", // 常规
          "fix", // 修复bug
          "feat" // 新增特性
        ],
      ],
    },
  };
  