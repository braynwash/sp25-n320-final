// File: js/generateCertificate.js
import { GeneratePDF } from "./jspdf/app.js";

/**
 *
 * @param {string} name       The user’s name to put on the cert
 * @param {string} iframeId   The id of the <iframe> to render into
 * @returns {GeneratePDF|null}  The PDF instance OR null if eror is found
 */
export function generateCertificate(name, iframeId = "pdfPreview") {
  if (!name.trim()) {
    alert("Please input your name first!");
    return null;
  }

  const pdf = new GeneratePDF(iframeId);

  pdf.addHeader("Certificate of Completion", "#4B0082");
  pdf.addText("This certifies that", "#000000");
  pdf.addText(name, "#006400");
  pdf.addText(
    "has successfully completed the Snake Milking History Crash Course.",
    "#000000"
  );

  pdf.showPdf();
  return pdf;
}
