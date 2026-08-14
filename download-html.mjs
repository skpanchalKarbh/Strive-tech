import scrape from 'website-scraper';

const options = {
  urls: ['http://localhost:3002/'], // Start from the homepage
  directory: './static-html-export', // Folder to save the HTML
  recursive: true, // Follow links
  maxRecursiveDepth: 5, // How deep to follow links
  filenameGenerator: 'bySiteStructure',
  request: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  }
};

console.log("Starting HTML export. This might take a few minutes...");

scrape(options).then((result) => {
  console.log("Success! Your website's complete HTML has been downloaded to the 'static-html-export' folder.");
}).catch((err) => {
  console.error("An error occurred while downloading:", err);
});
