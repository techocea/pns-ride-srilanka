"use client"

import {ImageLoaderProps} from 'next/image';

export const uploadthingLoader = ({src, width, quality}: ImageLoaderProps) => {
    return `${src}?width=${width}&quality=${quality || 75}&format=webp`;
};