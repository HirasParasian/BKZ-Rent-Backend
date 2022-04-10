const cloudPathToFileName = (path) => path.split('/').slice(-4).join('/').split('.')
  .slice(0, 1)
  .join('');

module.exports = { cloudPathToFileName };
