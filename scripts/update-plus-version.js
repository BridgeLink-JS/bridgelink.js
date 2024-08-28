
// update the version number in the package.json file
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;
const newVersion = version.replace(/(.*\.)(\d+)$/, (_, prefix, suffix) => {
  return prefix + (parseInt(suffix) + 1);
});

packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));