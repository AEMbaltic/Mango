// Generated brand media (Higgsfield). Hosted on Higgsfield's CDN because this
// build sandbox can't download them locally; they load fine in the browser / on
// Vercel. For production, download these and self-host under /public/images +
// /public/videos, then point these constants at the local paths.
//
// Each <Photo>/<HeroVideo> degrades to a branded gradient if its URL is empty
// or fails to load, so the layout never looks broken.

const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_36EpZtjCelPTkWjnVVW55TnM17W'

export const MEDIA = {
  heroVideo: `${CDN}/hf_20260629_184521_38178251-f48a-4492-a049-83675ad035b8.mp4`,
  heroPoster: `${CDN}/hf_20260629_184527_e2b993cc-653a-4454-9e63-e9a962783958.png`,
  mechanic: `${CDN}/hf_20260629_184531_58de4d7e-0e07-40a7-9f79-e0646561e32a.png`,
  keys: `${CDN}/hf_20260629_184537_ad5b7b4f-1b5f-4146-b449-0f48733c047a.png`,
  garage: `${CDN}/hf_20260629_184540_b6adecac-8f99-43d3-8705-6f58010199ba.png`,
  // "How it works" — everyday owner with her own car + phone, Lithuanian street.
  // Background-edited from the chosen take; fresh alternative:
  // hf_20260630_073614_82ccee49-9d7c-4474-ad6e-0a72ea008d69.png
  howItWorks: `${CDN}/hf_20260630_073610_26c034a6-bb2e-485f-948b-f903ed04265a.png`,
} as const
