import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * 引入依赖
 * npm i html2canvas jspdf
 * @param {string} htmlId 报表id
 * @param {string} title 报表标题
 * @param {string} bgColor 背景颜色
 */
export const generatePDF = async (htmlId, title = '报表', bgColor = '#fff') => {
  let pdfDom = document.getElementById(htmlId)
  pdfDom.style.padding = '0 10px'
  const A4Width = 595.28;
  const A4Height = 841.89;
  let canvas = await html2canvas(pdfDom, {
    scale: 2,
    useCORS: true,
    backgroundColor: bgColor,
  });
  let pageHeight = (canvas.width / A4Width) * A4Height;
  let leftHeight = canvas.height;
  let position = 0;
  let imgWidth = A4Width;
  let imgHeight = (canvas.height * A4Width) / canvas.width;

  let pageData = canvas.toDataURL("image/jpeg", 1.0);
  let PDF = new jsPDF("p", 'pt', 'a4');
  if (leftHeight < pageHeight) {
    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
  } else {
    while (leftHeight > 0) {
      PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= A4Height;
      if (leftHeight > 0) PDF.addPage();
    }
  }
  PDF.save(title + ".pdf");
}
