const inquirer = require('inquirer')
const shell = require('shelljs') // 执行文件操作
const config = [
  {
    name: 'H5',
    value: 'npm run dev:h5',
  },
  {
    name: '微信小程序',
    value: 'npm run dev:mp-weixin',
  },
  {
    name: '支付宝小程序',
    value: 'npm run dev:mp-alipay',
  },
  {
    name: '百度小程序',
    value: 'npm run dev:mp-baidu',
  },
  {
    name: '京东小程序',
    value: 'npm run dev:mp-jd',
  },
]

inquirer
  .prompt([
    {
      type: 'list',
      name: 'buildScript',
      message: '请选择你要编译的环境',
      choices: config,
    },
  ])
  .then((answers) => {
    if (!answers.buildScript) return
    shell.exec(answers.buildScript)
  })
