// @ts-check

import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import init from '../src/init.js';

const filename = fileURLToPath(import.meta.url);
const thisDirname = dirname(filename);

beforeEach(async () => {
  const pathToHtml = path.resolve(thisDirname, '__fixtures__/index.html');
  const html = await fs.readFile(pathToHtml, 'utf8');
  document.body.innerHTML = html;
});

test('init', () => {
  init();
  expect(true).toBeDefined();
});
