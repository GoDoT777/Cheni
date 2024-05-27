const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeSite() {
  try {
    const url = `https://www.spectrumchemical.com/chemical`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const results = [];
    $(".product-item-info").each((i, elem) => {
      const href = $(elem).find(".product-item-link").attr("href"); // Extract href attribute
      const text = $(elem).find(".product-item-name a").text().trim();
      const casNumber = $(elem).find(".attr-value a").text().trim(); // Extract text from <a> tag within .attr-value
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

    return results;
  } catch (error) {
    throw new Error("Scraping error: " + error.message);
  }
}

async function logScrapedResults() {
  try {
    const results = await scrapeSite();
    console.log(results);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

logScrapedResults();
