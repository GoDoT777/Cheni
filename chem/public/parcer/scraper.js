const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function scrapeAllPages() {
  try {
    const baseUrl = "https://www.spectrumchemical.com/chemical";
    const results = [];

    for (let page = 1; ; page++) {
      console.log("Scraping page", page);
      const url = `${baseUrl}?p=${page}`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const items = $(".product-item-info");
      console.log("Items found on page", page, ":", items.length);
      if (items.length === 0) {
        console.log("No more items found. Exiting loop.");
        break;
      }

      items.each((i, elem) => {
        const href = $(elem).find(".product-item-link").attr("href");
        const text = $(elem).find(".product-item-name a").text().trim();
        const casNumber = $(elem).find(".attr-value a").text().trim();
        const [formula, itemNumber, cas, manufacturer] = $(elem)
          .find(".attr-value")
          .map((i, el) => $(el).text().trim())
          .get();
        results.push({
          href,
          text,
          casNumber,
          formula,
          itemNumber,
          cas,
          manufacturer,
        });
      });
    }

    const jsonContent = JSON.stringify(results, null, 2);
    fs.writeFileSync("scraped_data.json", jsonContent);

    console.log("Scraping completed.");
    return results;
  } catch (error) {
    throw new Error("Scraping error: " + error.message);
  }
}

async function logScrapedResults() {
  try {
    const results = await scrapeAllPages();
    console.log(results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

logScrapedResults();
