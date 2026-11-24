/**
 * BULLETPROOF GOOGLE APPS SCRIPT FOR FASHION ART INSTITUTE
 * ---------------------------------------------------------
 * Supports both:
 * 1) Contest Doll Voting -> "Votes" tab
 * 2) Contact Enquiries    -> "Contact" tab
 * Also has doGet to easily test in browser.
 */

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "active",
      message: "Fashion Art Google Apps Script Webhook is RUNNING & READY!",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // If bound spreadsheet wasn't found directly, get active sheet's parent
      var active = SpreadsheetApp.getActiveSheet();
      if (active) ss = active.getParent();
    }

    if (!ss) {
      throw new Error("Spreadsheet not found! Make sure this script was opened from Extensions -> Apps Script inside your Google Sheet.");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Identify sheet type (Vote vs Contact)
    var isVote = (data.type === "vote" || data.sheet === "Votes" || data.dollNumber !== undefined);

    if (isVote) {
      var votesTab = ss.getSheetByName("Votes");
      if (!votesTab) {
        votesTab = ss.insertSheet("Votes");
        votesTab.appendRow([
          "Timestamp",
          "Doll Number",
          "Voter Name",
          "Voter Email",
          "Voter Phone",
          "Instagram ID",
          "Comment",
          "Screenshot URL"
        ]);
        votesTab.getRange("A1:H1").setFontWeight("bold").setBackground("#E8B520").setFontColor("#4A2511");
      }

      votesTab.appendRow([
        data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.dollNumber || "",
        data.voterName || "",
        data.voterEmail || "",
        data.voterPhone || "",
        data.instagramId || "",
        data.comment || "",
        data.screenshotUrl || ""
      ]);

      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Vote appended successfully", row: data })
      ).setMimeType(ContentService.MimeType.JSON);

    } else {
      // Default: Contact / Course Enquiry
      var contactTab = ss.getSheetByName("Contact");
      if (!contactTab) {
        contactTab = ss.insertSheet("Contact");
        contactTab.appendRow([
          "Timestamp",
          "Name",
          "Email",
          "Phone",
          "Course",
          "Message"
        ]);
        contactTab.getRange("A1:F1").setFontWeight("bold").setBackground("#4A2511").setFontColor("#FFFFFF");
      }

      contactTab.appendRow([
        data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.name || "",
        data.email || "",
        data.phone || "",
        data.course || "General Enquiry",
        data.message || ""
      ]);

      return ContentService.createTextOutput(
        JSON.stringify({ success: true, message: "Enquiry appended successfully", row: data })
      ).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
