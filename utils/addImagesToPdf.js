const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const axios = require("axios");


const addImagesToPdf = async (n, imageUrl) => {
  // Load the existing PDF template
  const existingPdfBytes = fs.readFileSync("./StickerTemplate.pdf");

  // Fetch the image from the internet
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const imageBytes = imageResponse.data;

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const image = await pdfDoc.embedPng(imageBytes); // Use embedJpg if your image is a JPG

  const pages = pdfDoc.getPages();
  const templatePage = pages[0];
  
  // Positions for the four boxes (adjust coordinates as needed)
  const positions = [
    { x: 20, y: 327, width: 384, height: 240 },
    { x: 444, y: 327, width: 384, height: 240 },
    { x: 20, y: 37, width: 384, height: 240 },
    { x: 444, y: 37, width: 384, height: 240 },
  ];

  let pageIndex = 0;
  let imagesAdded = 0;

  while (imagesAdded < n) {
    const page = pageIndex === 0 ? templatePage : await pdfDoc.copyPages(pdfDoc, [0]).then((pages) => pages[0]);
    pdfDoc.addPage(page);

    for (let i = 0; i < 4 && imagesAdded < n; i++, imagesAdded++) {
      const { x, y, width, height } = positions[i];
      page.drawImage(image, {
        x: x,
        y: y,
        width: width,
        height: height,
      });
    }

    pageIndex++;
  }

  // Remove the original template page if multiple pages are added
  if (n > 4) {
    pdfDoc.removePage(0);
  }

  // Save the modified PDF

  
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("./output.pdf", pdfBytes);
};


module.exports = {
    addImagesToPdf
}