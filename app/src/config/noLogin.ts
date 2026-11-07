// No-login build flag.
//
// When the app is built with VITE_DISABLE_AUTH=true, Auth0 is never loaded and the app runs
// purely in local mode: on-device models or your own OpenAI-compatible server
// (Ollama, llama.cpp, LM Studio, vLLM). Observer Cloud features that need an account
// (hosted models, SMS, WhatsApp, Telegram, Email, voice calls) are unavailable.
export const NO_LOGIN: boolean = import.meta.env.VITE_DISABLE_AUTH === 'true';
