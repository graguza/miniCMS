import pdfKit from "pdfkit";
import path from "path";
import { HttpStatus, HttpRequestHandler } from "./http";

/**
 * Controller class
 */

export class Controller {
  private margin = 20;
  private body = 570;
  private pagex = 610;
  private pagey = 843;
  private fontpath = path.join(__dirname, "fonts", "roboto", "Roboto-Regular.ttf");
  private font = "Roboto-Regular.ttf";
  /**
   * Handles post request, saves body in data source, returns http status created (201),
   * adds location header with url of the resource to the response
   * POST /collection
   * @param req request object
   * @param resp response object
   */
  public post(req, resp) {
    resp.header("Content-Type", "application/pdf");
    resp.header("Content-disposition", "attachment;filename=result.pdf");

    const doc: { title: string; subtitle: string; sections: { key: string; value: string }[] } = req.body;
    const pdf = new pdfKit({ layout: "portrait", margin: 20, size: "A4", autoFirstPage: false });
    pdf.on("pageAdded", () => this.addHeaderAndFooter(pdf));
    pdf.addPage();    
    // this.addImage(pdf, fontpath);
    this.addTitle(pdf, doc.title);
    this.addSubtitle(pdf, doc.subtitle);
    this.addSections(pdf, doc.sections);
    pdf.pipe(resp);
    pdf.end();
  }
  private addTitle(pdf, title) {
    pdf.font(this.fontpath).text(title);
  }

  private addSubtitle(pdf, subtitle) {
    pdf.font(this.fontpath).text(subtitle);
  }

  private addSections(pdf, sections: { key: string; value: string }[]) {
    sections.forEach((s) => {
      pdf.rect(20, pdf.y, 570, 5).fillAndStroke("#00953a");
      pdf.font(this.fontpath).text(s.key).text(s.value);
    });
  }

  private addImage(pdf: PDFKit.PDFDocument, fontpath: string) {
    pdf.moveTo(20, 85);
    const image = path.join(__dirname, "img", "pz.png");
    pdf.image(image, 20, 90);
    pdf.font(fontpath).text("Imię: Paweł", 260, 90).text("Nazwisko: Ziemiński").text("Płeć: mężczyzna");
  }

  private addHeaderAndFooter(pdf) {
    this.addHeader(pdf);
    this.addFooter(pdf);
  }
  private addHeader(pdf) {
    const image = path.join(__dirname, "img", "logo-small.png");
    pdf.image(image, 312, 0);
    pdf
      .moveTo(20, 83) // set the current point
      .lineTo(570, 83)
      .stroke();
  }

  private addFooter(pdf) {
    pdf
      .moveTo(20, 780) // set the current point
      .lineTo(570, 780)
      .stroke();

    pdf.fontSize(8).text("SOLWIT S.A.", 20, 785).text("ul. Azymutalna 11").text("80-298 Gdańsk");

    pdf.fontSize(8).text("tel. +48 58 770 34 92", 110, 785).text("www.solwit.com").text("solwit@solwit.com");

    pdf.fontSize(8).text("REGON: 221488370", 230, 785).text("KRS: 0000393016").text("NIP: 584-272-10-91");

    pdf
      .fontSize(8)
      .text("Sąd Rejonowy Gdańsk-Północ w Gdańsku,", 340, 785)
      .text("VII Wydział Gospodarczy Krajowego Rejestru Sądowego, ")
      .text("Kapitał zakładowy: 455 647,60 PLN");
  }
}
