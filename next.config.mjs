/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
	headers: () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "Cache-Control",
					value: "no-store",
				},
			],
		},
	],
};

export default nextConfig;
