# Self-hosted fonts

Spectral (static, weights 300 to 600, normal and italic) and JetBrains Mono
(variable, weights 100 to 800), latin subset, woff2. Both are licensed under
the SIL Open Font License 1.1.

- Spectral: Production Type, https://github.com/productiontype/Spectral
- JetBrains Mono: JetBrains, https://github.com/JetBrains/JetBrainsMono

Files were taken from the Google Fonts CDN (Spectral v15, JetBrains Mono v24)
and are loaded through `next/font/local` in `src/app/layout.tsx`. Hosting them
in the repo removes the build-time fetch from fonts.googleapis.com, which
failed intermittently under Turbopack with
`next/font/google queries have exactly one entry`.
