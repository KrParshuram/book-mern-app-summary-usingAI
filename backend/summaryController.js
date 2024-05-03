require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function generateSummary(book) {
    const { bookname, author } = book;
  
    // Construct the prompt using bookname and author
    const prompt = `Write a comprehensive summary of the book "${bookname}" written by ${author}. Your summary should strictly adhere to the following format:

    Introduction: This section should provide an overview of the book and its main themes.
    Key Concepts: In this section, outline the key concepts and ideas discussed in the book.
    Benefits: Describe the potential benefits or insights that readers can gain from the book.
    Conclusion: Summarize your overall thoughts on the book and its significance.
    
    Ensure that your summary is detailed and well-structured, covering all essential aspects of the book. Aim for a minimum word count of 1500 words to ensure thorough coverage."
    `;
   
      
    // Generate the summary
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = await response.text();
  
    return summary;
  }

module.exports = { generateSummary };
