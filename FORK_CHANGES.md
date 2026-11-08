# Observer Local – changes from the original

Observer Local is a modified version of [Observer AI](https://github.com/Roy3838/Observer) (© Roy Medina, AGPLv3).
It is an unofficial fork and is not affiliated with the original project.

- **Fork:** https://github.com/sebmue78/Observer-fuloc, branch `no-login`
- **Based on:** `Roy3838/Observer` `main` at commit `0bccd31` (app version 3.2.2)
- **Modified:** 2026-11-08 by Sebastian (sebmue78)
- **License:** GNU AGPLv3, unchanged (see [LICENSE](LICENSE))

## What changed and why

Goal: an Observer build that needs **no login and no Observer account** and runs only on local models or your own server.

### App (web frontend, shared by Android and desktop)

| File | Change |
|---|---|
| `app/src/config/noLogin.ts` (new) | `NO_LOGIN` flag, on when the frontend is built with `VITE_DISABLE_AUTH=true`. |
| `app/src/contexts/AuthContext.tsx` | New `NoAuthProvider`. With `NO_LOGIN`, Auth0 is never initialised and the app always runs signed out. |
| `app/src/web/App.tsx` | Uses `NoAuthProvider` when `NO_LOGIN` is set, hides the login button in the sidebar and passes an "on-device model" handler to the startup dialog. |
| `app/src/components/StartupDialogs.tsx` | Local-only startup dialog: choose an on-device model or connect your own OpenAI-compatible server. Lists which features are unavailable without an account. Credits the original project. |

Without `VITE_DISABLE_AUTH=true` the frontend behaves like the original.

### Android (`app/mobile`)

| File | Change |
|---|---|
| `gen/android/app/build.gradle.kts` | Application id `com.observer.ai.local`, so it installs next to the official app. Cleartext `http` is allowed so LAN servers such as `http://192.168.x.x:11434` work. |
| `gen/android/app/src/main/res/values/strings.xml` | App name "Observer Local". |
| `gen/android/app/src/main/AndroidManifest.xml` | Removed the OAuth callback intent filter, which is not needed without login. |
| `tauri.conf.json` | `frontendDist` is now relative (`../dist`) instead of an absolute path from the original author's machine. |
| `gen/android/.gitignore` | Ignores `keystore.properties`, which holds the signing secrets. |

### Desktop (`app/desktop`)

| File | Change |
|---|---|
| `tauri.conf.json` | Name "Observer Local", identifier `com.observer.ai.local`. **The auto-updater no longer points at the official releases**, which would otherwise replace this build with the login version. No updater artifacts. macOS builds are ad-hoc signed (`-`) instead of using the original author's Apple Developer ID. |

### Build and docs

| File | Change |
|---|---|
| `.github/workflows/android-nologin.yml` (new) | Builds a signed arm64 APK. Uses the repository secrets `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD` and `ANDROID_KEY_ALIAS` if set. |
| `.github/workflows/desktop-nologin.yml` (new) | Builds macOS (arm64, Intel), Windows (x64, ARM64) and Linux (x64) installers. |
| `README.md` | Fork notice, download and install instructions, and fork notes on unavailable features, support channels and code signing. |
| `FORK_CHANGES.md` (new) | This file. |

## Not available in Observer Local

These features run on Observer's servers and need an account:
hosted cloud models, SMS, WhatsApp, Email, Pushover and voice calls.

Local and direct integrations work: on-device models, your own server (Ollama, llama.cpp, LM Studio, vLLM), Discord webhooks, Telegram, Gotify, system notifications, memory, and screen and camera capture.

## Keeping up with the original

Sync `main` with `Roy3838/Observer` (the **Sync fork** button on GitHub), then merge `main` into `no-login`. Conflicts are most likely in the files listed above.
