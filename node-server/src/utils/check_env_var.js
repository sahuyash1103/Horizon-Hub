const {
  MONGO_URI,
  SESSION_SECRET,
  CLIENT_URL,
  JWT_PRIVATE_KEY,

  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,

  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,

  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} = require("./get-env");

function checkEnvironmentVariable() {
  const error = [];
  if (!JWT_PRIVATE_KEY) {
    console.log("ERROR: jwtPrivate key is not defined.");
    error.push("ERROR: jwtPrivate key is not defined.");
  }
  if (!SESSION_SECRET) {
    console.log("ERROR: session secret is not defined.");
    error.push("ERROR: session secret is not defined.");
  }
  if (!CLIENT_URL) {
    console.log("ERROR: client url is not defined.");
    error.push("ERROR: client url is not defined.");
  }
  if (!GOOGLE_CLIENT_ID) {
    console.log("ERROR: google client id is not defined.");
    error.push("ERROR: google client id is not defined.");
  }
  if (!GOOGLE_CLIENT_SECRET) {
    console.log("ERROR: google client secret is not defined.");
    error.push("ERROR: google client secret is not defined.");
  }
  if (!GITHUB_CLIENT_ID) {
    console.log("ERROR: github client id is not defined.");
    error.push("ERROR: github client id is not defined.");
  }
  if (!GITHUB_CLIENT_SECRET) {
    console.log("ERROR: github client secret is not defined.");
    error.push("ERROR: github client secret is not defined.");
  }
  if (!FIREBASE_API_KEY) {
    console.log("ERROR: firebase api key is not defined.");
    error.push("ERROR: firebase api key is not defined.");
  }
  if (!FIREBASE_AUTH_DOMAIN) {
    console.log("ERROR: firebase auth domain is not defined.");
    error.push("ERROR: firebase auth domain is not defined.");
  }
  if (!FIREBASE_PROJECT_ID) {
    console.log("ERROR: firebase project id is not defined.");
    error.push("ERROR: firebase project id is not defined.");
  }
  if (!FIREBASE_STORAGE_BUCKET) {
    console.log("ERROR: firebase storage bucket is not defined.");
    error.push("ERROR: firebase storage bucket is not defined.");
  }
  if (!FIREBASE_MESSAGING_SENDER_ID) {
    console.log("ERROR: firebase messaging sender id is not defined.");
    error.push("ERROR: firebase messaging sender id is not defined.");
  }
  if (!FIREBASE_APP_ID) {
    console.log("ERROR: firebase app id is not defined.");
    error.push("ERROR: firebase app id is not defined.");
  }
  if (!FIREBASE_MEASUREMENT_ID) {
    console.log("ERROR: firebase measurement id is not defined.");
    error.push("ERROR: firebase measurement id is not defined.");
  }
  if (!MONGO_URI) {
    console.log("ERROR: mongo url is not defined.");
    error.push("ERROR: mongo url is not defined.");
  }
  if (!GOOGLE_CALLBACK_URL) {
    console.log("WARNING: google callback url is not defined.");
    error.push("WARNING: google callback url is not defined.");
  }
  if (!GITHUB_CALLBACK_URL) {
    console.log("WARNING: github callback url is not defined.");
    error.push("WARNING: github callback url is not defined.");
  }
  return error;
}

module.exports = { checkEnvironmentVariable };
