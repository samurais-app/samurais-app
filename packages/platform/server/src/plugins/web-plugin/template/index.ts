import { extname } from 'path';

export function h5(files: string[]) {
    const css = files.filter((fl) => extname(fl) === '.css');
    const js = files.filter((fl) => extname(fl) === '.js');
    return `
    <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        ${css.map((j) => `<link href='${j}' />`).join('')}
      </head>
      <body id="h5" class="body">
        <div id="app"></div>
        ${js.map((j) => `<script src='${j}'></script>`).join('')}
      </body>
    </html>
  `;
}

export function template(files: string[]) {
    const css = files.filter((fl) => extname(fl) === '.css');
    const js = files.filter((fl) => extname(fl) === '.js');
    return `
    <!DOCTYPE html>
      <html lang="en-us">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" /> 
        ${css.map((j) => `<link href='${j}' />`).join('')}
      </head>
      <body class="body">
        <div id="app"></div>
        ${js.map((j) => `<script src='${j}'></script>`).join('')}
      </body>
    </html>
  `;
}