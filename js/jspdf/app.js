import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.0.0/jspdf.es.js";

class GeneratePDF {
  pdfDoc;
  position = {
    x: 10,
    y: 20,
  };
  margin = {
    x: 10,
    y: 20,
  };
  pageCounter = 1;
  domRef = "";

  /**
   *
   * @param {string} domRefId The id of the iframe element used to preview the PDF
   */
  constructor(domRefId) {
    console.log("GeneratePDF constructor DomRefId: ", domRefId);
    this.pdfDoc = new jsPDF();
    this.pdfDoc.setFontSize(12);
    if (domRefId) {
      this.domRef = document.querySelector(`#${domRefId}`);
      console.log("domRef: ", this.domRef);
    }
  }

  /**
   * @description Downloads the PDF document to device
   */
  downloadPdf() {
    this.pdfDoc.save("mydoc.pdf");
  }

  /**
   *
   * @returns {string} The domain local URL of the PDF document
   */
  getPdfUrl() {
    return this.pdfDoc.output("bloburl");
  }

  /**
   *
   * @param {string} text Content to be displayed in header
   * @param {string} color Color of the text
   */
  addHeader(text, color = "#000000") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.setFontSize(24);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 12;
    this.pdfDoc.setTextColor("#000000");
  }

  /**
   *
   * @param {string} text Content to be displayed in body
   * @param {string} color Color of the text
   */
  addText(text, color = "#000000") {
    this.pdfDoc.setTextColor(color);
    this.pdfDoc.setFontSize(12);
    this.pdfDoc.text(text, this.position.x, this.position.y);
    this.position.y += 6;
    this.pdfDoc.setTextColor("#000000");
  }

  /**
   * @description Shows the PDF in the iframe
   */
  showPdf() {
    if (this.domRef) {
      this.domRef.src = this.getPdfUrl();
    }
  }
}

const myPdf = new GeneratePDF("pdfPreview");

myPdf.addHeader("Snake Milker Certification");
myPdf.addText("This certificate hereby certifies that ");

// insert name

myPdf.addText(
  "has successfully completed the Snake Milker Certification course."
);
