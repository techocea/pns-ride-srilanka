import {buildConfig} from "payload";
import {mongooseAdapter} from "@payloadcms/db-mongodb";
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from "./collections/Users";
import { Media } from './collections/Media'
import { Destinations } from './collections/Destinations'
import { Tours } from './collections/Tours'
import { Gallery } from './collections/Gallery'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Users, Media, Destinations, Tours, Gallery],
    secret:  process.env.PAYLOAD_SECRET || "",
    db: mongooseAdapter({
        url: process.env.DATABASE_URL || "",
    }),
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
})