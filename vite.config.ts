import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],

	server: {
		hmr: {
			clientPort: 443,
		},
	}
};

export default config;
