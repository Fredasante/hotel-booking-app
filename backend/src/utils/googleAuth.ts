import { google } from "googleapis";

async function getAccessToken(): Promise<string> {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  try {
    const tokenResponse = await oauth2Client.getAccessToken();
    if (tokenResponse.token) {
      return tokenResponse.token;
    } else {
      throw new Error("Failed to retrieve access token");
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
    throw new Error("Failed to retrieve access token");
  }
}

export { getAccessToken };
