// config.js
const hostname = window.location.hostname;
const isDev = ['localhost', '127.0.0.1'].includes(hostname); // 開発環境判定（localhost または 127.0.0.1）

const config = {
  apiUrl: isDev
    ? 'http://localhost:3000/api_tatsumasa_nakano'
    : 'http://dev.marathon.rplearn.net/api_tatsumasa_nakano'
};

export default config;

