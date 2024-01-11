import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import axios from "axios";
import fs from "fs";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { loadSummarizationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

import { getDocument as pdfjsGetDocument } from "pdfjs-dist/legacy/build/pdf.js";

import pdfParse from "pdf-parse";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.3,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export default async function summarizePapers(papers, callback) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  for (const paper of papers) {
    try {
      // Skip the paper if pdflink is null
      if (!paper.pdflink) {
        console.log(`Skipping paper ${paper.title} because pdflink is null`);
        continue;
      }

      console.log(
        `Downloading PDF for paper ${paper.title} from ${paper.pdflink}`
      );

      // Download the PDF file
      const response = await axios.get(paper.pdflink, {
        responseType: "arraybuffer",
      });

      const pdfPath = path.join(
        __dirname,
        `${paper.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`
      );

      // Write the PDF file
      await fs.promises.writeFile(pdfPath, response.data);

      // Parse the PDF file
      const data = await pdfParse(response.data);

      // Write the extracted text to a .txt file
      const txtPath = path.join(
        __dirname,
        `${paper.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`
      );
      await fs.promises.writeFile(txtPath, data.text);
      console.log(txtPath);

      // Load the text file
      const loader = new TextLoader(txtPath);

      // Get the text content of the file
      const text = data.text;

      // Create documents by splitting the text
      const docs = await textSplitter.createDocuments([text]);

      // Load the summarization chain
      const chain = loadSummarizationChain(model, {
        type: "map_reduce",
        verbose: true,
      });

      // Call the summarization chain
      const res = await chain.call({
        input_documents: docs,
      });

      console.log("Summarization Result: ", res);

      const summary = {
        title: paper.title,
        authors: paper.authors,
        AIsummary: res.text,
        link: paper.link,
        pdflink: paper.pdflink,
      };

      // Call the callback function with the summary
      console.log(
        "About to call callback with summary for paper:",
        paper.title
      );
      callback(summary);

      // Delete the PDF file
      fs.unlinkSync(pdfPath);
    } catch (error) {
      console.error(`Error processing paper ${paper.title}:`, error);
    }
    console.log("Finished processing paper:", paper.title);
  }
}
