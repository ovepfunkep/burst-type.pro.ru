/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable unicorn/prefer-module */
/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	images: {
		unoptimized: true,
	},
	async redirects() {
		return [
			{
				source: '/migrate',
				destination: '/',
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
