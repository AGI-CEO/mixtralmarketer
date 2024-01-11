import axios from "axios";
import xml2js from "xml2js";

export default async function handler(req, res) {
  try {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const response = await axios.get("http://export.arxiv.org/api/query", {
      params: {
        search_query: "cat:cs.AI",
        start: 0,
        max_results: 10,
        sortBy: "submittedDate",
        sortOrder: "descending",
      },
    });

    // Parse the XML data to JSON
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);

    // Extract the papers
    const papers = result.feed.entry.map((entry) => {
      const title = entry.title[0];
      const authors = entry.author.map((author) => author.name[0]);
      const summary = entry.summary[0];
      const link = entry.link.find((link) => link.$.rel === "alternate").$.href;
      // Convert the link to the abstract page into a link to the PDF
      let pdflink = null;
      if (entry.link[0].$.href.includes("arxiv.org/abs/")) {
        pdflink = entry.link[0].$.href.replace("/abs/", "/pdf/") + ".pdf";
      }
      return { title, authors, summary, link, pdflink };
    });

    // You can now use the fetched papers to send your newsletter
    // For example, you might save them to a database, or format them into an email

    res.status(200).json({ message: "Task completed successfully", papers });
  } catch (error) {
    console.error("Failed to fetch papers:", error);
    res
      .status(500)
      .json({ message: "Failed to complete task", error: error.message });
  }
}
