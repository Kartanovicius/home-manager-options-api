// src/main.ts
import { type Server } from 'bun';

export default {
  async fetch(
    request: Request,
    server: Server,
  ) {
    return new Response(
      'Hello from Bun on Vercel',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      },
    );
  },
};
