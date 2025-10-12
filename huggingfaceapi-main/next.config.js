/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // ✅ HF 임베드 허용 (핵심)
              "frame-src https://huggingface.co https://*.hf.space https://*.hf.co",
              // 임베드 내부 리소스들
              "img-src 'self' data: https://huggingface.co https://*.hf.space https://*.hf.co",
              "connect-src 'self' https://huggingface.co https://*.hf.space https://*.hf.co",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://huggingface.co https://*.hf.space https://*.hf.co",
              "style-src 'self' 'unsafe-inline'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
