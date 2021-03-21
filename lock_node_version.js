
/**
 * This script executes before "npm install"
 * Lock the version of Node running based on the one set in the package.json
 */

 const fs = require('fs');
 const path = require('path');

 const packageJson = require('./package.json');
 const requiredNodeVersion = packageJson.engines.node;

 const runningNodeVersion = process.version;

 // set .nvmrc and .node_version to have the same version

 fs.writeFileSync(path.join(__dirname, '.node-version'), requiredNodeVersion, 'UTF8');
 fs.writeFileSync(path.join(__dirname, '.nvmrc'), requiredNodeVersion, 'UTF8');

 // check that the required version of Node is running

 const requiredNodeVersionParts = requiredNodeVersion.split('.');
 const runningNodeVersionParts = (runningNodeVersion.split('.')).map(part => part.replace(/\D/,''));
 let isIncorrect = false;

 requiredNodeVersionParts.forEach((part, index) => {
   if (parseInt(part) > parseInt(runningNodeVersionParts[index])) {
     isIncorrect = true;
   }
 })
 if (isIncorrect) {
   //eslint-disable-next-line
   console.error(`
             You are not running the required version of Node, please use version ${requiredNodeVersion}.
             If you have installed NVM and AVN, just exit the project folder and cd into it again.
             If you haven't installed NVM and AVN, please install it! Details here:
             https://itnext.io/locking-the-node-js-version-in-your-projects-70268c877421
             `);

   // kill the process if the required node version is not the one running
   process.exit(1);
 }