import { GeneratePDF } from "./jspdf/app.js";

const snakes = [
  { name: "King Cobra" },
  { name: "Black Mamba" },
  { name: "Inland Taipan" },
  { name: "Eastern Diamondback Rattlesnake" },
  { name: "Fer-de-Lance" },
  { name: "Puff Adder" },
  { name: "Saw-Scaled Viper" },
  { name: "Coastal Taipan" },
  { name: "Gaboon Viper" },
  { name: "Mojave Rattlesnake" }
];

/**
 *
 * @param {string} name       The user’s name to put on the cert
 * @param {string} iframeId   The id of the <iframe> to render into
 * @returns {GeneratePDF|null}  The PDF instance OR null if eror is found
 */
export async function generateCertificate(name, iframeId = "pdfPreview") {
  if (!name.trim()) {
    alert("Please input your name first!");
    return null;
  }

  function getRandomSnake() {
    const randomIndex = Math.floor(Math.random() * snakes.length);
    
    return snakes[randomIndex].name;
  }

  const randomSnake = getRandomSnake();


  const pdf = new GeneratePDF(iframeId);

  pdf.addHeader("Certificate of Completion", "#4B0082");
  pdf.addText("This certifies that", "#000000");
  pdf.addText(name, "#006400");
  pdf.addText(
    "has successfully completed the Snake Milking History Crash Course.",
    "#000000"
  );
  pdf.addText(`Today's Snake of the Day: ${randomSnake}`, "#006400");

  pdf.showPdf();
  return pdf;
}
