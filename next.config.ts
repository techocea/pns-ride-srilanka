import {withPayload} from '@payloadcms/next/withPayload'
import {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        imgOptTimeoutInSeconds: 30,
    },
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: '*.ufs.sh'},
            {protocol: 'https', hostname: 'utfs.io'},
        ],
    },
};

export default withPayload(nextConfig)
