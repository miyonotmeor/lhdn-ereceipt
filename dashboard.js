/* ==========================================================
   LHDN E-Receipt
   Dashboard
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const receiptCount =
        document.getElementById("receiptCount");

    const totalAmount =
        document.getElementById("totalAmount");

    if (!receiptCount || !totalAmount) {

        return;

    }

    const receipts =
        JSON.parse(localStorage.getItem("receipts")) || [];

    receiptCount.textContent = receipts.length;

    let total = 0;

    receipts.forEach(receipt => {

        total += parseFloat(
            String(receipt.totalPaid).replace(/,/g, "")
        ) || 0;

    });

    totalAmount.textContent =
        "RM" + total.toFixed(2);

});
