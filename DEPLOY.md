# OMNIX EMPIRE — Website ko GitHub se live kaise karein

Ye folder OMNIX EMPIRE website ka poora source code hai (React + TanStack Start + Tailwind).

---

## 1. Apne computer pe chalana (test karne ke liye)

Pehle **Bun** install karein: https://bun.sh

```bash
bun install
bun run dev
```

Phir browser me kholein: http://localhost:8080

---

## 2. GitHub pe daalna

GitHub.com par jaakar ek **khaali (empty) repository** banayein (README/template tick mat karein).
Phir is folder me terminal kholkar:

```bash
git init
git add -A
git commit -m "OMNIX EMPIRE website"
git branch -M main
git remote add origin https://github.com/<aapka-username>/<repo-name>.git
git push -u origin main
```

`<aapka-username>` aur `<repo-name>` ki jagah apni details daal dein.

---

## 3. Website live (deploy) karna

⚠️ Ye site sirf HTML files nahi hai — isme ek chhota server (SSR) bhi chalta hai.
Isliye **GitHub Pages akele se ye site nahi chala payegi.** Kisi ek host ka chunav karein.

Production build banane ke liye:

```bash
bun run build
```

Build ka result **`dist/`** folder me banta hai:
- `dist/client` — static files (images, CSS, JS, favicon, robots.txt)
- `dist/server` — server code + `wrangler.json` (Cloudflare ke liye)

### A) Cloudflare (is project ka default target)
Build ke baad:

```bash
npx nitro deploy --prebuilt
```

ya `dist/server/wrangler.json` use karke `npx wrangler deploy`.

### B) Vercel
1. vercel.com → **Add New → Project** → apni GitHub repository import karein.
2. Build command: `bun run build`
3. Pehle `vite.config.ts` me Vercel ka preset laga dein:
   ```ts
   export default defineConfig({
     tanstackStart: { server: { entry: "server" } },
     nitro: { preset: "vercel" },
   });
   ```
4. Deploy dabayein.

### C) Netlify
`vite.config.ts` me `nitro: { preset: "netlify" }` set karein, build command `bun run build`,
aur publish directory `.netlify`.

> Vercel/Cloudflare/Netlify sab free tier dete hain. Kisi ek par site live ho jaati hai.
> (Cloudflare wala raasta isi machine par build karke check kiya gaya hai; Vercel/Netlify
> ke preset aapko apne account par ek baar deploy karke confirm karne honge.)

---

## 4. Files ka short intro

| Kya | Kahan |
|---|---|
| Poora page, text, download buttons, links | `src/routes/index.tsx` |
| Colors, fonts, animations | `src/styles.css` |
| Logo aur screenshots | `public/images/` |
| OMNIX OTT ka size / version / date | `src/routes/index.tsx` me `stats={[...]}` wali line |
| OMNIX OTT ka download link | `src/routes/index.tsx` me `link="https://www.mediafire.com/..."` |
| Telegram links | `src/routes/index.tsx` ke top par `TG_MAIN`, `TG_OFFICIAL` |
| Backend (login/database) ke settings | `.env` (values sirf public/publishable hain, koi secret key nahi) |
