import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
   ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
   SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
   BUCKET: process.env.BUCKET,
}