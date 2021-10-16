/* eslint-disable unicorn/prefer-module */
const { spawn } = require('child_process');

module.exports = (variable) =>
  new Promise((resolve, reject) => {
    const child = spawn('./node_modules/.bin/dotenv', [
      '-e',
      '../.env',
      '-p',
      variable,
    ]);

    child.stdout.on('data', (data) => {
      const value = data.toString().trim();

      if (!value) {
        reject(new Error(`Environment variable "${variable}" not found`));
      }

      resolve(value);
    });

    child.stderr.on('data', (data) => {
      reject(new Error(`Some error in getting dotenv var: ${data}`));
    });
  });

/* eslint-enable */
