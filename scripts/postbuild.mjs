import { readFile, writeFile } from 'node:fs/promises';

const BASE = '/Project-one/';

const guard = [
  '<script>',
  `sessionStorage.setItem('redirect', location.pathname + location.search + location.hash);`,
  `location.replace('${BASE}');`,
  '</script>'
].join('');

const html = await readFile('dist/index.html', 'utf8');
await writeFile('dist/404.html', html.replace('<head>', `<head>\n    ${guard}`));
await writeFile('dist/.nojekyll', '');

console.log('404.html generado con redirección a', BASE);