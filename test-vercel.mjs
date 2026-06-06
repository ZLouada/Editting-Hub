import handler from './.vercel/output/functions/__server.func/index.mjs';

const req = new Request('http://localhost:3000/');
handler.fetch(req, {}).then(async (res) => {
  console.log("Status:", res.status);
  console.log(await res.text());
}).catch(console.error);
