export const envConfig = () => ({
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  webUrl: process.env.WEB_URL,
});
