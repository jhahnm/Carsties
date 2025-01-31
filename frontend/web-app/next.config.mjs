/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.pixabay.com'
            }
        ]
    },
    output: 'standalone'
};

export default nextConfig;
