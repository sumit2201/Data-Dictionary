const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || '27017';
const DB_NAME = process.env.DB_NAME || 'data-dictionary';

let userPassStr = "";
if (DB_USERNAME !== "") {
    userPassStr = DB_USERNAME + ':' + DB_PASSWORD + '@';
}
const mongodburi = 'mongodb://' + userPassStr + DB_HOST + ':' + DB_PORT + '/' + DB_NAME;

module.exports = {
    jwtSecret: JWTSECRET,
    mongodburi,
};