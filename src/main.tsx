import { createRoot } from 'react-dom/client'

import './styles/index.css'
import App from './App.tsx'

import RootProvider from '@/providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <RootProvider>
    <App />
  </RootProvider>
)
