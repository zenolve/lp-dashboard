import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// Base
import { BASE } from './src/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: BASE,
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	}
});
