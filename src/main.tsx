// src/main.tsx hoặc src/index.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { App as AntdApp } from 'antd'; // ✅ Import App wrapper từ antd
import App from './App.js';
import '~/index.css';
import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AntdApp> {/* ✅ Bọc toàn bộ App bằng App của antd */}
        <App />
      </AntdApp>
    </BrowserRouter>
  </React.StrictMode>
);

