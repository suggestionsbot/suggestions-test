const path = require('path');
const { lstatSync, readdirSync } = require('fs');

module.exports = (directory) => {
  const extensions = ['.js', '.ts'];

  const read = (dir, files = []) => {
    for (const file of readdirSync(dir)) {
      const filePath = path.join(dir, file),
        stats = lstatSync(filePath);
      if (stats.isFile() && extensions.some((ext) => filePath.endsWith(ext)))
        files.push(filePath);
      else if (stats.isDirectory()) files = files.concat(read(filePath));
    }

    return files;
  };

  return read(directory);
};
