import axios from "axios";
import * as cheerio from "cheerio";

export const scrapAmazonProduct = async (url: string) => {
  if (!url) return;

  const userName = process.env.BRIGHT_DATA_USERNAME;
  const password = process.env.BRIGHT_DATA_PASSWORD;

  if (!userName || !password) {
    throw new Error("Missing BRIGHT_DATA_USERNAME or BRIGHT_DATA_PASSWORD in environment variables");
  }

  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${userName}-session-${session_id}`,
      password: password as string, 
    },
    host: 'https://brd.superproxy.io', 
    port,
    httpsAgent: new (require('https').Agent)({
      rejectUnauthorized: false, 
    }),
  };

//   const fetcherFunction = async () => {
//     const res = await axios.get(url, options);
//     console.log(res.data);
//   };

  try {

    const {data} = await axios.get(url, options);
    const $ = cheerio.load(data);
    const title = $('#productTitle').text().trim();
    const price = $('.priceToPay span .a-price-whole').text().trim();
    console.log({title, price});

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
