import * as Tesseract from 'tesseract.js';
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

export const processFile = async (uploadedFile) => {
  let documentText = '';
  const fileType = uploadedFile.type;

  try {
    if (fileType === 'application/pdf') {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let extractedText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        extractedText += textContent.items.map(item => item.str).join(' ') + ' ';
      }
      documentText = extractedText;

    } else if (fileType.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(uploadedFile, 'eng', {
        logger: (m) => console.log(m),
      });
      documentText = text;

    } else {
      throw new Error('Unsupported file type. Please upload a PDF or an image.');
    }
  } catch (e) {
    throw new Error(`Failed to process document. Details: ${e.message}`);
  }

  if (documentText.trim() === '') {
    throw new Error('Could not extract any text from the document.');
  }

  return documentText;
};