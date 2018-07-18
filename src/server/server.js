
"use strict";

require('dotenv').config();

import express from 'express'
import React from 'react'
import App from '../client/App.jsx'

import { renderToString } from 'react-dom/server'
import { SheetsRegistry } from 'react-jss/lib/jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'

import knexConfig from './knexfile'
import knex from 'knex'
import knexLogger from 'knex-logger'

const app = express();
const port = process.env.PORT || 3000;

// This is fired every time the server side receives a request.
app.use(handleRender);

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Mount all resource routes
app.use("/", Routes);
app.listen(port);

// inject our initial component HTML and CSS into a template to be rendered on the client side.
function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}

// When rendering, we will wrap App, our root component, inside a JssProvider and MuiThemeProvider 
// to make the sheetsRegistry and the theme available to all components in the component tree.
// Render the initial HTML of our component before we send it to the client side. 
// To do this, we use ReactDOMServer.renderToString().
function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757575',
        main: '#a4a4a4',
        dark: '#494949',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#263238',
        main: '#a4a4a4',
        dark: '#494949',
        contrastText: '#ffffff',
      },
      // accent: red,
      // type: 'light',
    },
  });

  const generateClassName = createGenerateClassName();

  // Render the component to a string.
  const html = renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <App />
      </MuiThemeProvider>
    </JssProvider>
  )

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString()

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}

console.log(`Serving at https://localhost:${port}`);