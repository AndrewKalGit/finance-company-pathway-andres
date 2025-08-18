import type { NextApiRequest, NextApiResponse } from 'next';
import Busboy, { FileInfo } from 'busboy';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { Readable } from 'stream';

export const config = {
  api: { bodyParser: false }, // Disable Next.js body parsing for file uploads
};

interface JotFormResponse {
  responseCode: number;
  content?: unknown;
}

export async function POST(req: Request) {
  const form = new FormData();
  const contentType = req.headers.get('content-type') || '';
  const busboy = Busboy({ headers: { 'content-type': contentType } });

  return new Promise<Response>((resolve) => {
    busboy.on('file', (_fieldname: string, file: NodeJS.ReadableStream, info: FileInfo) => {
      form.append('bankStatements', file, info.filename);
    });

    busboy.on('field', (name: string, val: string) => {
      form.append(name, val);
    });

    busboy.on('finish', async () => {
      try {
        const jotformRes = await fetch(
          `https://api.jotform.com/form/YOUR_FORM_ID/submissions?apiKey=${process.env.JOTFORM_API_KEY}`,
          {
            method: 'POST',
            body: form,
          }
        );

        const json = (await jotformRes.json()) as JotFormResponse;

        if (json.responseCode === 200) {
          resolve(new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        } else {
          console.error('JotForm response:', json);
          resolve(new Response(JSON.stringify({ success: false }), { status: 500, headers: { 'Content-Type': 'application/json' } }));
        }
      } catch (err) {
        console.error('Submission error:', err);
        resolve(new Response(JSON.stringify({ success: false }), { status: 500, headers: { 'Content-Type': 'application/json' } }));
      }
    });

    // Convert the web ReadableStream to a Node.js Readable stream
        if (req.body) {
          const reader = req.body.getReader();
          const nodeStream = new Readable({
            async read() {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                this.push(Buffer.from(value));
              }
              this.push(null);
            }
          });
          nodeStream.pipe(busboy);
        } else {
          busboy.end();
        }
  });
}
