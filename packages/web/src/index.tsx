import React from 'react';
import { createRoot } from 'react-dom/client';
import { logger } from '@samurais-app/components';
import { App } from './app';
logger('dev', '.....11231');
const root = createRoot(document.getElementById('app'));
root.render(<App />);