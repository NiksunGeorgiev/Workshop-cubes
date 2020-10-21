

module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: `mongodb+srv://NikGeorgiev:${process.env.DB_PASS}@softuni.tawo7.mongodb.net/cubicule?retryWrites=true&w=majority`,
    },
    production: {}
};