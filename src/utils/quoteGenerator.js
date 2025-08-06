/**
 * Generates a quote document by downloading the template with a renamed file
 * @param {Object} submission - The submission data
 * @param {Object} ratingData - The rating data (if available)
 * @returns {Promise<void>}
 */
export const generateQuote = async (submission, ratingData = null) => {
  try {
    // Fetch the template
    const response = await fetch(
      "/2025 Renewal Schedule - Les Ambassadeurs Ltd.docx",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quote template");
    }

    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;

    // Generate filename with insured name and ID
    const sanitizedName = submission.insuredName.replace(/[^a-z0-9]/gi, "_");
    const fileName = `Quote_${sanitizedName}_${submission.id}.docx`;

    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true, fileName };
  } catch (error) {
    console.error("Error generating quote:", error);
    throw new Error("Failed to generate quote document");
  }
};

/**
 * Downloads the quote template without renaming
 */
export const downloadQuoteTemplate = async () => {
  try {
    const response = await fetch(
      "/2025 Renewal Schedule - Les Ambassadeurs Ltd.docx",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch quote template");
    }

    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "2025_Renewal_Schedule_Template.docx";

    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading template:", error);
    throw new Error("Failed to download template");
  }
};
