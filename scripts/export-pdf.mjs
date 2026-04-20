import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = normalize(join(__dirname, ".."));
const distDir = join(rootDir, "dist");
const outputPdf = join(rootDir, "resume-kleiton.pdf");
const chromeBinary =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const port = Number(process.env.PDF_PORT ?? 4317);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (req, res) => {
  try {
    const requestPath = req.url === "/" ? "/index.html" : req.url ?? "/index.html";
    const safePath = normalize(join(distDir, requestPath));

    if (!safePath.startsWith(distDir)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    const fileInfo = await stat(safePath);

    if (!fileInfo.isFile()) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const data = await readFile(safePath);
    const type = mimeTypes[extname(safePath)] ?? "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch (error) {
    res.writeHead(404);
    res.end("Not Found");
  }
});

const waitForServer = () =>
  new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve(undefined));
  });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const closeServer = () =>
  new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(undefined);
    });
  });

const printPdf = () =>
  new Promise((resolve, reject) => {
    const url = `http://127.0.0.1:${port}`;
    const child = spawn(
      chromeBinary,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--no-pdf-header-footer",
        `--print-to-pdf=${outputPdf}`,
        url,
      ],
      { stdio: "inherit" },
    );

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve(undefined);
        return;
      }

      reject(new Error(`Chrome encerrou com código ${code}.`));
    });
  });

try {
  await stat(distDir);
} catch (error) {
  console.error("Pasta dist não encontrada. Execute `npm run build` antes do export.");
  process.exit(1);
}

try {
  await stat(chromeBinary);
} catch (error) {
  console.error(
    `Chrome não encontrado em ${chromeBinary}. Defina CHROME_PATH se ele estiver em outro local.`,
  );
  process.exit(1);
}

try {
  await waitForServer();
  await wait(700);
  await printPdf();
  console.log(`PDF gerado em ${outputPdf}`);
} finally {
  await closeServer();
}
