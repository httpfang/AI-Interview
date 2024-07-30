/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://intruve_db_owner:25gkIHulJnpE@ep-proud-surf-a55ecwv0.us-east-2.aws.neon.tech/intruve_db?sslmode=require',
    }
  };