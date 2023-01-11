export default () => ({
    PORT: parseInt(process.env.PORT) || 3000,
    URL_MONGODB: process.env.URL_MONGODB
});