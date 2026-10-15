import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function pdfApiPlugin(): Plugin {
  return {
    name: 'pdf-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/generate-pdf', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method Not Allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const { generatePdfBuffer } = await import('./src/server/pdfService.js');
            const pdfBuffer = await generatePdfBuffer(data);

            const filename = (data.documentTitle || 'document').replace(/[^a-z0-9_-]/gi, '_') + '.pdf';
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Length', pdfBuffer.length);
            res.end(pdfBuffer);
          } catch (error) {
            console.error('API PDF Generation Error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: String(error) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    pdfApiPlugin(),
  ],
  server: {
    port: 5174,
  },
});
