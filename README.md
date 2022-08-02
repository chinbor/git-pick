# git-pick

## usage
1. install [husky](https://www.npmjs.com/package/husky) + [lint-staged](https://www.npmjs.com/package/lint-staged), click [here](https://juejin.cn/post/7062303366768132132) to see detail

2. install [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli) + [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) as devDependencies, root dir add file `commitlint.config.js`

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'UI', 'chore', 'locale', 'refactor', 'perf', 'test', 'build', 'ci', 'revert', 'conflict', 'font', 'delete', 'stash']],
  },
}

``` 

3. install [commitizen](https://www.npmjs.com/package/commitizen) + [cz-conventional-changelog-zh-emoji](https://www.npmjs.com/package/cz-conventional-changelog-zh-emoji) as devDependencies, root dir add file `.czrc`

```json
{
  "path": "cz-conventional-changelog-zh-emoji",
  "types": {
    "feat": {
      "description": "一个新功能",
      "title": "Features",
      "emoji": "✨"
    },
    "fix": {
      "description": "一个bug",
      "title": "Bug Fixes",
      "emoji": "🐛"
    },
    "docs": {
      "description": "文档增删改",
      "title": "Documentation",
      "emoji": "📂"
    },
    "UI": {
      "description": "样式修改(空白、格式、缺少分号等)",
      "title": "UI",
      "emoji": "💎"
    },
    "chore": {
      "description": "除src目录或测试文件以外的修改",
      "title": "Chores",
      "emoji": "♻️"
    },
    "locale": {
      "description": "为国际化做了微小的贡献",
      "title": "Locale",
      "emoji": "👩🏻‍❤️‍👩🏿"
    },
    "refactor": {
      "description": "既不修复bug也不添加新功能的更改",
      "title": "Code Refactoring",
      "emoji": "📦"
    },
    "perf": {
      "description": "性能优化",
      "title": "Performance Improvements",
      "emoji": "🚀"
    },
    "test": {
      "description": "增加测试",
      "title": "Tests",
      "emoji": "🚨"
    },
    "build": {
      "description": "影响构建系统或外部依赖项的更改(示例范围:gulp、broccoli、npm)",
      "title": "Builds",
      "emoji": "🛠️"
    },
    "ci": {
      "description": "对CI配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)",
      "title": "Continuous Integrations",
      "emoji": "⚙️"
    },
    "revert": {
      "description": "回退历史版本",
      "title": "Reverts",
      "emoji": "🕰️"
    },
    "conflict": {
      "description": "修改冲突",
      "title": "Conflict",
      "emoji": "💀"
    },
    "font": {
      "description": "字体文件更新",
      "title": "Fonts",
      "emoji": "🖌️"
    },
    "delete": {
      "description": "删除文件",
      "title": "Delete Files",
      "emoji": "🗑️"
    },
    "stash": {
      "description": "暂存文件",
      "title": "Stash Files",
      "emoji": "💿"
    }
  }
}
```

4. add script in `package.json` file which in root dir

```json
{
  "scripts": {
    "commit": "git-pick && git cz"
  }
}
```
