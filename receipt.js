/* ==========================================================
   LHDN E-Receipt
   Receipt Data Model
========================================================== */

const ReceiptTemplate = {

    merchantName: "",

    receiptNumber: "",

    receiptDate: "",

    receiptTime: "",

    totalAmount: "",

    taxAmount: "",

    paymentMethod: "",

    tinNumber: "",

    brnNumber: "",

    cashierName: "",

    receiptImage: "",

    createdAt: "",

    updatedAt: ""

};

/* ==========================================================
   Create Empty Receipt
========================================================== */

function createReceipt() {

    return {

        ...ReceiptTemplate

    };

}

/* ==========================================================
   Save Receipt
========================================================== */

function saveReceipt(receipt) {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        return false;

    }

    const receiptHistory =
        JSON.parse(localStorage.getItem("receiptHistory")) || {};

    const username = currentUser.username;

    if (!receiptHistory[username]) {

        receiptHistory[username] = [];

    }

    receipt.createdAt = new Date().toLocaleString();
    receipt.updatedAt = receipt.createdAt;

    receiptHistory[username].push(receipt);

    localStorage.setItem(
        "receiptHistory",
        JSON.stringify(receiptHistory)
    );

    return true;

}

/* ==========================================================
   Get Current User Receipts
========================================================== */

function getReceipts() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        return [];

    }

    const receiptHistory =
        JSON.parse(localStorage.getItem("receiptHistory")) || {};

    return receiptHistory[currentUser.username] || [];

}

/* ==========================================================
   Clear Current User Receipts
========================================================== */

function clearReceipts() {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        return;

    }

    const receiptHistory =
        JSON.parse(localStorage.getItem("receiptHistory")) || {};

    receiptHistory[currentUser.username] = [];

    localStorage.setItem(
        "receiptHistory",
        JSON.stringify(receiptHistory)
    );

}
