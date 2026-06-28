/* ==========================================================
   LHDN E-Receipt
   Receipt Details
   Part 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------------------
       Current User
    --------------------------------------------- */

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        window.location.href = "login.html";
        return;

    }

    const dashboardUsername =
        document.getElementById("dashboardUsername");

    if (dashboardUsername) {

        dashboardUsername.textContent =
            currentUser.fullName;

    }

    /* --------------------------------------------
       OCR Text
    --------------------------------------------- */

    const ocrText =
        localStorage.getItem("ocrText");

    if (!ocrText) {

        alert("No OCR data found.");

        window.location.href = "scan.html";

        return;

    }

});

/* --------------------------------------------
   Extract Basic Information
--------------------------------------------- */

const receiptNumber =
    (ocrText.match(/LHDN-\d{4}-\d+/i) || [])[0] ||
    "Not detected";

const receiptDate =
    (ocrText.match(/\d{2}\/\d{2}\/\d{4}/) || [])[0] ||
    "Not detected";

const receiptName =
    (ocrText.match(/Name\s*[:/]?\s*([A-Z ]+)/i) || [])[1] ||
    "Not detected";

const receiptIC =
    (ocrText.match(/\d{6}-\d{2}-\d{4}/) || [])[0] ||
    "Not detected";

/* --------------------------------------------
   Display Information
--------------------------------------------- */

document.getElementById("receiptNumber").textContent =
    receiptNumber;

document.getElementById("receiptDate").textContent =
    receiptDate;

document.getElementById("receiptName").textContent =
    receiptName;

document.getElementById("receiptIC").textContent =
    receiptIC;

document.getElementById("receiptYear").textContent =
    assessmentYear;

document.getElementById("receiptPayment").textContent =
    paymentType;

document.getElementById("receiptTax").textContent =
    taxAmount;

document.getElementById("receiptSST").textContent =
    sstAmount;

document.getElementById("receiptTotal").textContent =
    totalPaid;

document.getElementById("receiptReference").textContent =
    referenceNumber;

document.getElementById("receiptStatus").textContent =
    paymentStatus;

/* --------------------------------------------
   Extract Remaining Information
--------------------------------------------- */

const assessmentYear =
    (ocrText.match(/Assessment Year\s*[:/]?\s*(\d{4})/i) || [])[1] ||
    "Not detected";

const paymentType =
    (ocrText.match(/Income Tax Payment/i) || [])[0] ||
    "Not detected";

const taxAmount =
    (ocrText.match(/Tax Amount[\s\S]*?(\d{1,3}(?:,\d{3})*\.\d{2})/i) || [])[1] ||
    "Not detected";

const sstAmount =
    (ocrText.match(/SST.*?(\d+\.\d{2})/i) || [])[1] ||
    "Not detected";

const totalPaid =
    (ocrText.match(/TOTAL PAID[\s\S]*?(\d{1,3}(?:,\d{3})*\.\d{2})/i) || [])[1] ||
    "Not detected";

const referenceNumber =
    (ocrText.match(/FPX\d+/i) || [])[0] ||
    "Not detected";

const paymentMethod =
    (ocrText.match(/FPX Online Banking/i) || [])[0] ||
    "Not detected";

const paymentStatus =
    (ocrText.match(/BERJAYA\s*\/\s*COMPLETED/i) || [])[0] ||
    "Not detected";
