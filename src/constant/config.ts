const config = {
  BACK_END_URL: import.meta.env.VITE_BACK_END_URL,
  CLIENT_URL: import.meta.env.VITE_CLIENT_BASE_URL,
  CONTACT_MAIL: import.meta.env.VITE_APP_CONTACT_MAIL,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  VITE_IMAGE_PROXY_SERVER: import.meta.env.VITE_IMAGE_PROXY_SERVER
} as const;

export default config;
