const express = require('express');
const router = express.Router();
const { PDFDocument: PDFLibDocument } = require('pdf-lib');
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // For generating unique names
const path = require("path");
const fs = require("fs");
const pdfModel = require("../models/pdfs");
const axios = require("axios")
// Configure multer to store the uploaded file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const cron = require('node-cron');
const crypto = require('crypto');

const {decodeUser} = require("../middlewares/decodeUser")


// Function to save image and PDF files and return their paths


const saveFilesToSystem = async (pdfBuffer) => {
  try {
    // Define directory paths
    const pdfDir = path.join(__dirname, '..', 'pdfs');


    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Generate unique file names using uuid
    const pdfFilename = `${uuidv4()}.pdf`;

    const pdfPath = path.join(pdfDir, pdfFilename);


    // Save PDF to the "pdfs" folder
    fs.writeFileSync(pdfPath, pdfBuffer);
    console.log(`PDF saved to ${pdfPath}`);

    return { pdfPath, pdfFilename };
  } catch (error) {
    console.error("Error saving files:", error.message);
    throw error;
  }
};


// Function to generate PDF and save files


const generatePdfAndSave = async (template, imageUrl) => {
  try {

    // Generate PDF with the image
    const pdfBuffer = await addImagesToPdf(template, imageUrl);

    // Save both image and PDF to the filesystem
    const { pdfPath, pdfFilename } = await saveFilesToSystem(pdfBuffer);

    return { pdfPath, pdfFilename };
  } catch (error) {
    console.error("Error generating and saving PDF:", error.message);
    throw error;
  }
};


const addImagesToPdf = async (template, imageUrl) => {
  try {
    console.log("template", template);

    const fs = require('fs');
    const { PDFDocument } = require('pdf-lib');

    let existingPdfBytes
    let n = 0;
    let positions = []
    let loopIteration = 0
    if (template == 1) {
      existingPdfBytes = fs.readFileSync("./StickerTemplate.pdf");
      n = 4
      loopIteration = 4
      positions = [
        { x: 21, y: 327, width: 381, height: 258 },
        { x: 448, y: 327, width: 381, height: 258 },
        { x: 21, y: 25, width: 381, height: 258 },
        { x: 448, y: 25, width: 381, height: 258 },
      ];
    }
    if (template == 2) {
      existingPdfBytes = fs.readFileSync("./StickerTemplate2.pdf");
      n = 50
      loopIteration = 50
      positions = [
        { "x": 13.5, "y": 540.82, "width": 160, "height": 54 },
        { "x": 179.15, "y": 540.82, "width": 160, "height": 54 },
        { "x": 345.30, "y": 540.82, "width": 160, "height": 54 },
        { "x": 510.75, "y": 540.82, "width": 160, "height": 54 },
        { "x": 676.60, "y": 540.82, "width": 160, "height": 54 },


        { "x": 13.5, "y": 481.39, "width": 160, "height": 54 },
        { "x": 179.15, "y": 481.39, "width": 160, "height": 54 },
        { "x": 345.30, "y": 481.39, "width": 160, "height": 54 },
        { "x": 510.75, "y": 481.39, "width": 160, "height": 54 },
        { "x": 676.60, "y": 481.39, "width": 160, "height": 54 },

        { "x": 13.5, "y": 422.50, "width": 160, "height": 54 },
        { "x": 179.15, "y": 422.50, "width": 160, "height": 54 },
        { "x": 345.30, "y": 422.50, "width": 160, "height": 54 },
        { "x": 510.75, "y": 422.50, "width": 160, "height": 54 },
        { "x": 676.60, "y": 422.50, "width": 160, "height": 54 },

        { "x": 13.5, "y": 363.54, "width": 160, "height": 54 },
        { "x": 179.15, "y": 363.54, "width": 160, "height": 54 },
        { "x": 345.30, "y": 363.54, "width": 160, "height": 54 },
        { "x": 510.75, "y": 363.54, "width": 160, "height": 54 },
        { "x": 676.60, "y": 363.54, "width": 160, "height": 54 },

        { "x": 13.5, "y": 304.12, "width": 160, "height": 54 },
        { "x": 179.15, "y": 304.12, "width": 160, "height": 54 },
        { "x": 345.30, "y": 304.12, "width": 160, "height": 54 },
        { "x": 510.75, "y": 304.12, "width": 160, "height": 54 },
        { "x": 676.60, "y": 304.12, "width": 160, "height": 54 },

        { "x": 13.5, "y": 245.70, "width": 160, "height": 54 },
        { "x": 179.15, "y": 245.70, "width": 160, "height": 54 },
        { "x": 345.30, "y": 245.70, "width": 160, "height": 54 },
        { "x": 510.75, "y": 245.70, "width": 160, "height": 54 },
        { "x": 676.60, "y": 245.70, "width": 160, "height": 54 },

        { "x": 13.5, "y": 186.27, "width": 160, "height": 54 },
        { "x": 179.15, "y": 186.27, "width": 160, "height": 54 },
        { "x": 345.30, "y": 186.27, "width": 160, "height": 54 },
        { "x": 510.75, "y": 186.27, "width": 160, "height": 54 },
        { "x": 676.60, "y": 186.27, "width": 160, "height": 54 },


        { "x": 13.5, "y": 127.85, "width": 160, "height": 54 },
        { "x": 179.15, "y": 127.85, "width": 160, "height": 54 },
        { "x": 345.30, "y": 127.85, "width": 160, "height": 54 },
        { "x": 510.75, "y": 127.85, "width": 160, "height": 54 },
        { "x": 676.60, "y": 127.85, "width": 160, "height": 54 },

        { "x": 13.5, "y": 68.42, "width": 160, "height": 54 },
        { "x": 179.15, "y": 68.42, "width": 160, "height": 54 },
        { "x": 345.30, "y": 68.42, "width": 160, "height": 54 },
        { "x": 510.75, "y": 68.42, "width": 160, "height": 54 },
        { "x": 676.60, "y": 68.42, "width": 160, "height": 54 },

        { "x": 13.5, "y": 9, "width": 160, "height": 54 },
        { "x": 179.15, "y": 9, "width": 160, "height": 54 },
        { "x": 345.30, "y": 9, "width": 160, "height": 54 },
        { "x": 510.75, "y": 9, "width": 160, "height": 54 },
        { "x": 676.60, "y": 9, "width": 160, "height": 54 }
      ]
    }
    if (template == 3) {
      existingPdfBytes = fs.readFileSync("./StickerTemplate3.pdf");
      // n = 18
      // loopIteration = 18
      // positions = [
      //   { "x": 15.5, "y": 710.82, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 710.82, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 710.82, "width": 186, "height": 126 },


      //   { "x": 15.5, "y": 572.39, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 572.39, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 572.39, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": 433.96, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 433.96, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 433.96, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": 295.53, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 295.53, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 295.53, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": 157.1, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 157.1, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 157.1, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": 18.67, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": 18.67, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": 18.67, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": -119.76, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": -119.76, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": -119.76, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": -258.19, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": -258.19, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": -258.19, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": -396.62, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": -396.62, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": -396.62, "width": 186, "height": 126 },

      //   { "x": 15.5, "y": -533.05, "width": 186, "height": 126 },
      //   { "x": 211.15, "y": -533.05, "width": 186, "height": 126 },
      //   { "x": 406.8, "y": -533.05, "width": 186, "height": 126 },
      // ]

      n = 10
      loopIteration = 10
      positions = [
        { "x": 27, "y": 678.82, "width": 212, "height": 150 },
        { "x": 264.15, "y": 678.82, "width": 212, "height": 150 },

        { "x": 27, "y": 515.39, "width": 212, "height": 150 },
        { "x": 264.15, "y": 515.39, "width": 212, "height": 150 },

        { "x": 27, "y": 350, "width": 212, "height": 150 },
        { "x": 264.15, "y": 350, "width": 212, "height": 150 },

        { "x": 27, "y": 183.53, "width": 212, "height": 150 },
        { "x": 264.15, "y": 183.53, "width": 212, "height": 150 },

        { "x": 27, "y": 17.1, "width": 212, "height": 150 },
        { "x": 264.15, "y": 17.1, "width": 212, "height": 150 },
      ]
    }
    if (template == 4) {
      existingPdfBytes = fs.readFileSync("./StickerTemplate4.pdf");
      n = 50
      loopIteration = 50
      positions = [
        { "x": 9, "y": 530.82, "width": 165, "height": 57.5 },
        { "x": 175, "y": 530.82, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 530.82, "width": 165, "height": 57.5 },
        { "x": 508, "y": 530.82, "width": 165, "height": 57.5 },
        { "x": 676, "y": 530.82, "width": 165, "height": 57.5 },


        { "x": 9, "y": 473.39, "width": 165, "height": 57.5 },
        { "x": 175, "y": 473.39, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 473.39, "width": 165, "height": 57.5 },
        { "x": 508, "y": 473.39, "width": 165, "height": 57.5 },
        { "x": 676, "y": 473.39, "width": 165, "height": 57.5 },

        { "x": 9, "y":415.96, "width": 165, "height": 57.5 },
        { "x": 175, "y":415.96, "width": 165, "height": 57.5 },
        { "x": 341.5, "y":415.96, "width": 165, "height": 57.5 },
        { "x": 508, "y":415.96, "width": 165, "height": 57.5 },
        { "x": 676, "y":415.96, "width": 165, "height": 57.5 },

        { "x": 9, "y": 358.53, "width": 165, "height": 57.5 },
        { "x": 175, "y": 358.53, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 358.53, "width": 165, "height": 57.5 },
        { "x": 508, "y": 358.53, "width": 165, "height": 57.5 },
        { "x": 676, "y": 358.53, "width": 165, "height": 57.5 },

        { "x": 9, "y": 301.1, "width": 165, "height": 57.5 },
        { "x": 175, "y": 301.1, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 301.1, "width": 165, "height": 57.5 },
        { "x": 508, "y": 301.1, "width": 165, "height": 57.5 },
        { "x": 676, "y": 301.1, "width": 165, "height": 57.5 },

        { "x": 9, "y": 243.67, "width": 165, "height": 57.5 },
        { "x": 175, "y": 243.67, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 243.67, "width": 165, "height": 57.5 },
        { "x": 508, "y": 243.67, "width": 165, "height": 57.5 },
        { "x": 676, "y": 243.67, "width": 165, "height": 57.5 },

        { "x": 9, "y": 186.24, "width": 165, "height": 57.5 },
        { "x": 175, "y": 186.24, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 186.24, "width": 165, "height": 57.5 },
        { "x": 508, "y": 186.24, "width": 165, "height": 57.5 },
        { "x": 676, "y": 186.24, "width": 165, "height": 57.5 },


        { "x": 9, "y": 128.81, "width": 165, "height": 57.5 },
        { "x": 175, "y": 128.81, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 128.81, "width": 165, "height": 57.5 },
        { "x": 508, "y": 128.81, "width": 165, "height": 57.5 },
        { "x": 676, "y": 128.81, "width": 165, "height": 57.5 },

        { "x": 9, "y": 71.38, "width": 165, "height": 57.5 },
        { "x": 175, "y": 71.38, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 71.38, "width": 165, "height": 57.5 },
        { "x": 508, "y": 71.38, "width": 165, "height": 57.5 },
        { "x": 676, "y": 71.38, "width": 165, "height": 57.5 },

        { "x": 9, "y": 13.95, "width": 165, "height": 57.5 },
        { "x": 175, "y": 13.95, "width": 165, "height": 57.5 },
        { "x": 341.5, "y": 13.95, "width": 165, "height": 57.5 },
        { "x": 508, "y": 13.95, "width": 165, "height": 57.5 },
        { "x": 676, "y": 13.95, "width": 165, "height": 57.5 }
      ]
    }

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBytes = imageResponse.data;

    const contentType = imageResponse.headers['content-type'];
    let image;
    // Determine the image format based on the content type
    if (contentType === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else if (contentType === 'image/jpeg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (contentType === 'image/webp') {
      image = await pdfDoc.embedWebP(imageBytes);
    } else {
      throw new Error("Unsupported image format");
    }


    let imagesAdded = 0;

    while (imagesAdded < n) {
      const templatePage = (await pdfDoc.copyPages(pdfDoc, [0]))[0];
      pdfDoc.addPage(templatePage);

      for (let i = 0; i < loopIteration && imagesAdded < n; i++, imagesAdded++) {
        const { x, y, width, height } = positions[i];
        templatePage.drawImage(image, { x, y, width, height });
      }
    }

    // if (n <= 4) {
    // }

    pdfDoc.removePage(0); // Remove the original first page if multiple pages are added

    await pdfDoc.save()

    return Buffer.from(await pdfDoc.save());
  } catch (error) {
    console.error("Error generating PDF:", error.message);
    throw error;
  }
};




router.post("/uploadImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image uploaded.");
    }

    console.log("req.body", req.body);

    const imageBuffer = req.file.buffer;
    const contentType = req.file.mimetype;

    // Generate PDF and save both image and PDF to the filesystem
    const { imagePath, pdfPath, imageFilename, pdfFilename } = await generatePdfAndSave(req.body.qty, req.body.template, imageBuffer, contentType);

    // Save the paths to MongoDB
    let temp;

    if (req.body.template == 1) {
      temp = "4 stickers"
    }
    if (req.body.template == 2) {
      temp = "50 stickers"
    }
    if (req.body.template == 3) {
      temp = "18 stickers"
    }
    if (req.body.template == 4) {
      temp = "50 stickers nametag"
    }



    const newPdfDoc = new pdfModel({
      template: temp,
      image: imageFilename,
      pdf: pdfFilename,
      timestamp: Date.now()
    });

    await newPdfDoc.save();


    console.log("Saved to MongoDB:", newPdfDoc);

    res.status(200).send("Image and PDF saved successfully.");
  } catch (error) {
    console.error("Error:", error.message);
    res.status(422).send('Error processing the image.');
  }
});






const saveData = async () => {
  try {
    const pdfData = await pdfModel.find({ processed: false })

    if (pdfData.length > 0) {

      async function customLoop(limit, i = 0) {
        if (i < limit) {
          let t = 1;
          console.log("pdfData[i]", pdfData[i]);
          if (pdfData[i].template == "template_1") {
            t = 1
          }
          if (pdfData[i].template == "template_2") {
            t = 2
          }
          if (pdfData[i].template == "template_3") {
            t = 3
          }
          if (pdfData[i].template == "template_4") {
            t = 4
          }

          const { pdfPath, pdfFilename } = await generatePdfAndSave(t, pdfData[i].imageUrl);
          const updatePdfData = await pdfModel.findOneAndUpdate({ _id: pdfData[i]._id }, {
            pdf: pdfFilename,
            processed: true
          })
          customLoop(limit, i + 1); // Recursive call with an in  cremented value
        } else {
          return
        }
      }
      await customLoop(pdfData.length);

    }
    return
  }
  catch (e) {
    console.log(e);
    return
  }
}


cron.schedule('*/3 * * * *', () => {
  console.log('Cron job running every 3 minutes');
  saveData()
  // Add your task logic here
});

saveData()







router.get("/getData",decodeUser, async (req, res) => {
  try {
    const response = await pdfModel.find({})
    return res.status(200).json({ success: true, message: response })

  }
  catch (e) {
    console.log(e);
    return res.status(400).json({ success: false, message: e })
  }
})















async function fetchOrder(orderId) {
  // const url = `https://3c87a4ef7872d65a8dbf9c1bd1002eca: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@2fe60e-c5.myshopify.com/admin/api/2024-07/orders/${orderId}.json`
  const url = `https://${process.env.Api_Key_new_mid_app}:${process.env.Admin_Api_Access_token_new_mid_app}@2fe60e-c5.myshopify.com/admin/api/2024-07/orders/${orderId}.json`
  try {
    const response = await axios.get(url);
    console.log("response", response.data.order.line_items[0].properties);
    return response.data.order
  } catch (error) {
    console.error('Error order:', error);
    throw error;
  }
}



async function fetchProduct(productId) {
  // const url = `https://3c87a4ef7872d65a8dbf9c1bd1002eca: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@2fe60e-c5.myshopify.com/admin/api/2024-07/products/${productId}.json`
  const url = `https://${process.env.Api_Key_new_mid_app}:${process.env.Admin_Api_Access_token_new_mid_app}@2fe60e-c5.myshopify.com/admin/api/2024-07/products/${productId}.json`
  try {
    const response = await axios.get(url);
    console.log("response", response.data);
    console.log("response", response.data.product.tags);
    const tagsArray = response.data.product.tags.split(',').map(tag => tag.trim()); // Split and trim the tag values
    const templateTag = tagsArray.find(tag => tag.startsWith("template"));
    console.log("templateTag", templateTag);
    return templateTag // Returns an array of images
  } catch (error) {
    console.error('Error fetching product images:', error);
    throw error;
  }
}



const createDuplicateObject = (data, n) => {
  let temp = []
  for (let i = 0; i < n; i++) {
    let p = {}
    p.orderName = data.orderName
    p.orderId = data.orderId
    p.productId = data.productId
    p.imageUrl = data.imageUrl
    p.template = data.template

    temp.push(p)
  }

  return temp
}

router.post("/webhook", async (req, res) => {
  try {

    console.log("Webhook called with data:", req.body);
    console.log("Webhook called with name:", req.body.name);

    // const orderId = req.body.name; // Replace with the actual order ID
    // fetchOrderWithImages(orderId);

    console.log("req.body.line_items.length", req.body.line_items.length);



    async function customLoop(limit, i = 0) {
      if (i < limit) {

        console.log("---productId---", req.body.line_items[i]?.product_id);
        console.log("---variantId---", req.body.line_items[i]?.variant_id);
        console.log("---properties---", req.body.line_items[i]?.properties);

        const newImgUrl = req.body.line_items[i]?.properties[2].value
        const productId = req.body.line_items[i]?.product_id;
        const variantId = req.body.line_items[i]?.variant_id;
        const quantity = req.body.line_items[i]?.quantity;

        const template = await fetchProduct(productId)

        let p = {}
        p.orderName = req.body.name
        p.orderId = req.body.id
        p.productId = productId
        p.imageUrl = newImgUrl
        p.template = template

        console.log("productId", productId);
        console.log("variantId", variantId);
        console.log("newImgUrl", newImgUrl);

        if (quantity > 1) {
          const dataArray = createDuplicateObject(p, quantity)
          const addAll = await pdfModel.insertMany(dataArray)
        }
        else {
          const response = await pdfModel.create(p)
        }

        customLoop(limit, i + 1); // Recursive call with an incremented value
      } else {
        return
      }
    }

    await customLoop(req.body.line_items.length);


    res.status(200).send('This is a correct JSON callback');

  }
  catch (e) {
    console.error("Webhook error:", e.message);
    res.status(422).send('Incorrect data');
  }
})


router.post("/uploadOlderOrders",decodeUser, async (req, res) => {
  try {
    console.log("ccccc");

    if (!req.body.orderId || req.body.orderId == "" || req.body.orderId == null || typeof req.body.orderId == undefined) {
      throw "invalid or no order Id"
    }

    const checkOrderId = await pdfModel.findOne({ orderId: req.body.orderId })


    if (checkOrderId !== null) {
      throw "order already added"
    }


    const data = await fetchOrder(req.body.orderId)
    if (!data) {
      throw "order not found"
    }


    console.log("Webhook called with data:", data);
    console.log("Webhook called with name:", data.name);


    console.log("data.line_items.length", data.line_items.length);


    async function customLoop(limit, i = 0) {
      if (i < limit) {

        console.log("---productId---", data.line_items[i]?.product_id);
        console.log("---variantId---", data.line_items[i]?.variant_id);
        console.log("---properties---", data.line_items[i]?.properties);

        const newImgUrl = data.line_items[i]?.properties[2].value
        const productId = data.line_items[i]?.product_id;
        const variantId = data.line_items[i]?.variant_id;
        const quantity = data.line_items[i]?.quantity;

        const template = await fetchProduct(productId)
        console.log("template",template);
        

        let p = {}
        p.orderName = data.name
        p.orderId = data.id
        p.productId = productId
        p.imageUrl = newImgUrl
        p.template = template

        console.log("productId", productId);
        console.log("variantId", variantId);
        console.log("newImgUrl", newImgUrl);

        if (quantity > 1) {
          const dataArray = createDuplicateObject(p, quantity)
          const addAll = await pdfModel.insertMany(dataArray)
        }
        else {
          const response = await pdfModel.create(p)
        }

        customLoop(limit, i + 1); // Recursive call with an incremented value
      } else {
        return
      }
    }


    await customLoop(data.line_items.length);


    res.status(200).json({ success: true, message: "order added" })
  }
  catch (e) {
    console.log(e);
    return res.status(400).json({ success: false, message: e })
  }
})





  


module.exports = router;