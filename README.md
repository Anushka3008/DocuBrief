# DocuBrief – Document Summary Assistant

> Instantly get the key takeaways from any document. The fastest way to summarize PDFs and images.

---

## 📖 Overview

DocuBrief is a web application that allows users to upload PDFs or image documents and automatically generates smart summaries. It uses **OCR technology** to extract text from images and an **AI API** to create summaries of varying lengths.

---

## ✨ Features

- **Document Upload**: Easily upload PDF or image files (JPG, PNG) via drag-and-drop or file picker.
- **AI-Powered Summaries**: Generates intelligent summaries of the document content using AI.
- **Customizable Summary Length**: Choose between **short, medium, and long summaries**.
- **Text Extraction**: Handles both text-based PDFs and scanned images via **Tesseract.js OCR**.
- **Modern UI**: Responsive, clean, and lightweight interface built with **React + Tailwind CSS**.

---

## 🛠️ Technologies Used

- **React** – Frontend framework  
- **Tailwind CSS** – Styling and responsive UI  
- **Tesseract.js** – OCR for image text extraction  
- **AI API** – Summarization engine  
- **Vercel/Netlify** – Hosting 

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (>=14.x) and npm installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Anushka3008/DocuBrief.git
    cd DocuBrief
    ```


2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    - Create a .env file in the root folder and add:
      ```
      REACT_APP_API_KEY=your_api_key_here
      ```

### Running the App

To run the application, you'll need two separate terminal windows.

1.  In the first terminal, start the React development server:
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

2.  In the second terminal, run the Tailwind CSS build process:
    ```bash
    npm run tailwind
    ```

---
## 🚀 Deployment

This application is ready for deployment on platforms like Vercel or Netlify.

1. Run the build command:
    ```bash
    npm run build
    ```
2. Deploy the contents of the `build/` folder to your hosting provider. 

3. Add your `REACT_APP_API_KEY` as an environment variable in the hosting provider’s settings.


## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/license/mit).