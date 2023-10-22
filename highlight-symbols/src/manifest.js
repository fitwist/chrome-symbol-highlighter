import { defineManifest } from '@crxjs/vite-plugin';
import pkg from '../package.json';

export default defineManifest(() => ({
	manifest_version: 3,
	name: '__MSG_extension_name__',
	version: pkg.version,
	description: '__MSG_extension_description__',
	default_locale: 'en',
	minimum_chrome_version: '109',
	icons: {
		16: 'src/icons/16.png',
		32: 'src/icons/32.png',
		48: 'src/icons/48.png',
		128: 'src/icons/128.png'
	},
	action: {
		default_title: '__MSG_extension_action_title__',
		default_popup: 'src/action/index.html',
		default_icon: {
			16: 'src/icons/16.png',
			24: 'src/icons/24.png',
			32: 'src/icons/32.png'
		}
	},
	content_scripts: [{
		matches: ['<all_urls>'],
		run_at: 'document_idle',
		js: ['src/content/index.js']
	}],
	web_accessible_resources: [
		{
			matches: ['<all_urls>'],
			resources: ['src/eyo/safe.txt', 'src/eyo/not_safe.txt'],
			use_dynamic_url: true
		}
	],
	permissions: ['tabs']
}));
