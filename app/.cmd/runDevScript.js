/* eslint-disable unicorn/prefer-module,no-console */
const { spawn } = require('child_process');
const path = require('path');

const getEnvVar = require('./getEnvVar');
const { error } = require('./clcPresets');

(async () => {
  try {
    const DEBUG_PORT = await getEnvVar('DEBUG_PORT');

    const child = spawn(path.resolve('./node_modules/.bin/tsnd'), [
      `--inspect=0.0.0.0:${DEBUG_PORT}`,
      '-r',
      'tsconfig-paths/register',
      'src/main.ts',
    ]);

    child.stdout.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    child.stderr.on('data', (data) => {
      process.stdout.write(data.toString());
    });
  } catch (error_) {
    console.log(error(error_.message));
  }
})();

/* eslint-enable */
