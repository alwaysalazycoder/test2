import chalk from "chalk";

const logger = {
  info: (message) => console.log(chalk.bgBlueBright(` [INFO] ${message} `)),
  success: (message) => console.log(chalk.bgGreen(` [🟢 SUCCESS] ${message} `)),
  warn: (message) => console.log(chalk.bgYellowBright(` [WARN] ${message} `)),
  error: (message) => console.log(chalk.bgRedBright(` [ERROR] ${message} `)),
};

export default logger;
