import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

let cachedData: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const currentTime = Date.now();

  if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
    return res.status(200).json(cachedData);
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
        },
      }
    );

    cachedData = response.data;
    lastFetchTime = currentTime;

    res.status(200).json(cachedData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
