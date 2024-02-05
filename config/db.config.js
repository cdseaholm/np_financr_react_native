module.exports = {
    HOST: process.env.EXPO_PUBLIC_DATABASE_HOST,
    USER: process.env.EXPO_PUBLIC_DATABASE_USER,
    PASSWORD: process.env.EXPO_PUBLIC_DATABASE_PASSWORD,
    DB: process.env.EXPO_PUBLIC_DATABASE_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };