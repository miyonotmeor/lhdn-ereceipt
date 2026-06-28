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


   /* --------------------------------------------
   Recent Activity
--------------------------------------------- */

const recentActivity =
    document.getElementById("recentActivity");

if (recentActivity) {

    const receipts =
        JSON.parse(localStorage.getItem("receipts")) || [];

    if (receipts.length > 0) {

        const latest =
            receipts[receipts.length - 1];

        recentActivity.innerHTML = `
            <div class="activity-card">

                <div class="activity-icon">
                    <i class="fa-solid fa-receipt"></i>
                </div>

                <div class="activity-content">

                    <h3>${latest.receiptNumber || "-"}</h3>

                    <p><strong>Name:</strong> ${latest.name || "-"}</p>

                    <p><strong>Date:</strong> ${latest.date || "-"}</p>

                    <p><strong>Total:</strong> RM${latest.totalPaid || "0.00"}</p>

                    <p><strong>Status:</strong> ${latest.status || "-"}</p>

                </div>

            </div>
        `;

    }

}

});
