import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('https://www.youtube.com/');
  const [msg, setMsg] = useState('');

  async function openYoutube(e) {
    e.preventDefault();
    setMsg('request dikirim...');
    const res = await fetch('/api/open', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    const data = await res.json();
    setMsg(JSON.stringify(data));
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Youtube Puppeteer Desktop</h1>
      <form onSubmit={openYoutube}>
        <input style={{width: 600}} value={url} onChange={e => setUrl(e.target.value)} />
        <button type="submit">Open with Puppeteer</button>
      </form>
      <pre>{msg}</pre>
    </main>
  );
}
