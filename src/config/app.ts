export default {
  api_version: process.env.API_VERSION,
  swagger: {
    title: process.env.SWAGGER_TITLE,
    desc: process.env.SWAGGER_DESC,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
