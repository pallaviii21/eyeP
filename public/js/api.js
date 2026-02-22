// const API_KEY = "6917f380212642799decd163f59090a7";
// const BASE_URL = "https://ip-intelligence.abstractapi.com/v1";

async function fetchIPData(ip) {
  try {
    const response = await fetch(`/api/ip/${ip}`);

    if (!response.ok) {
      throw new Error("API request failed.");
    }

    const data = await response.json();
    return { success: true, data };

  } catch (error) {
    return {
      success: false,
      error: "Unable to fetch IP data."
    };
  }
}
