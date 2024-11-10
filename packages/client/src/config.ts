import { defineConfig, mergeConfig, type UserConfig } from 'vite';

export const genConfig = (config: UserConfig) => {
  return defineConfig(mergeConfig({
    root: __dirname,
    define: {
      'process.env': JSON.stringify(process.env),
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: {
      emptyOutDir: true,
    }
  }, config));
};
