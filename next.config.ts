import {withPayload} from '@payloadcms/next/withPayload'
import {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {bodySizeLimit: '10mb'},
    },
};

export default withPayload(nextConfig)
