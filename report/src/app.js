import React from 'react';
import {render} from 'react-dom';
import Container from './components/Container';

const electron = require('electron')

const electronArgs = electron.remote.process.argv
const rootPath = electronArgs.slice(-1)[0].replace('--root-path=', '')
process.chdir(rootPath)

render(<Container/>, document.getElementById('app-root'));