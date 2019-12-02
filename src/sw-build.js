// Provides the build instructions for the custom Service Worker generation.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const workboxBuild = require('workbox-build');
const buildServiceWorker = () => {
  return workboxBuild
    .injectManifest({
      swSrc: 'src/sw-template.js',
      swDest: 'build/sw.js',
      globDirectory: 'build',
      globPatterns: ['**/*.{js,css,html,jpg,png}']
    })
    .then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      console.log(`${count} files (${size} bytes) will be precached.`);
    });
};
buildServiceWorker();
