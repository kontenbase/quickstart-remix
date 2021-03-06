import { KontenbaseClient } from '@kontenbase/sdk';

const KONTENBASE_API_KEY = process.env.KONTENBASE_API_KEY;

export const kontenbase = new KontenbaseClient({
  apiKey: KONTENBASE_API_KEY,
});

export const kontenbaseApiUrl = `https://api.kontenbase.com/query/api/v1/${KONTENBASE_API_KEY}`;
