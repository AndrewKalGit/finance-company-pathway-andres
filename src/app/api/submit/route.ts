import type { NextApiRequest, NextApiResponse } from 'next';
import Busboy, { FileInfo } from 'busboy';
import FormData from 'form-data';
import fetch from 'node-fetch';

export const config = {
  api: { bodyParser: false }, // Disable Next.js body parsing for file uploads
};

interface JotFormResponse {
  responseCode: number;
  content?: unknown;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new FormData();
  const bb = Busboy({ headers: req.headers });

  bb.on('file', (_fieldname: string, file: NodeJS.ReadableStream, info: FileInfo) => {
    // Append each uploaded file under the field name JotForm expects
    form.append('bankStatements', file, info.filename);
  });

  bb.on('field', (name: string, val: string) => {
    // Append all text fields from your frontend
    form.append(name, val);
  });

  bb.on('finish', async () => {
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
        res.status(200).json({ success: true });
      } else {
        console.error('JotForm response:', json);
        res.status(500).json({ success: false });
      }
    } catch (err) {
      console.error('Submission error:', err);
      res.status(500).json({ success: false });
    }
  });

  req.pipe(bb);
}
