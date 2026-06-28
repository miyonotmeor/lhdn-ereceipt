/* ==========================================================
   LHDN E-Receipt
   Receipt History
   Part 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const currentUser =
        JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {

        window.location.replace("login.html");

        return;

    }

    const username =
        document.getElementById("dashboardUsername");

    if (username) {

        username.textContent = currentUser.fullName;

    }

    const historyContainer =
        document.getElementById("receiptHistoryList");

    const receipts =
        JSON.parse(localStorage.getItem("receipts")) || [];

    if (receipts.length === 0) {

        historyContainer.innerHTML = `

            <div class="empty-state">

                <i class="fa-solid fa-receipt"></i>

                <h3>No Saved Receipts</h3>

                <p>Your saved receipts will appear here.</p>

            </div>

        `;

        return;

    }

  /* --------------------------------------------
   Generate Receipt Cards
--------------------------------------------- */

receipts
    .slice()
    .reverse()
    .forEach((receipt, index) => {

        historyContainer.innerHTML += `

            <div class="history-card">

                <div class="history-top">

                    <div>

                        <h2>

                            ${receipt.receiptNumber || "Unknown Receipt"}

                        </h2>

                        <p>

                            ${receipt.receiptDate || "-"}

                        </p>

                    </div>

                    <span class="history-status">

                        ${receipt.paymentStatus || "Unknown"}

                    </span>

                </div>

                <div class="history-body">

                    <p>

                        <strong>Name:</strong>
                        ${receipt.receiptName || "-"}

                    </p>

                    <p>

                        <strong>Total:</strong>
                        RM${receipt.totalPaid || "0.00"}

                    </p>

                    <p>

                        <strong>Reference:</strong>
                        ${receipt.referenceNumber || "-"}

                    </p>

                </div>

                <div class="history-buttons">

                    <button class="secondary-button view-btn"
        data-index="${receipts.length - 1 - index}">

    <i class="fa-solid fa-eye"></i>

    View

</button>

<button class="secondary-button pdf-btn"
        data-index="${receipts.length - 1 - index}">

    <i class="fa-solid fa-file-pdf"></i>

    PDF

</button>

<button class="primary-button delete-btn"
        data-index="${receipts.length - 1 - index}">

    <i class="fa-solid fa-trash"></i>

    Delete

</button>
                </div>

            </div>

        `;

    });

/* ==========================================================
   View Receipt
========================================================== */

document.querySelectorAll(".view-btn").forEach(button => {

    button.addEventListener("click", () => {

        const index = button.dataset.index;

        localStorage.setItem(
            "selectedReceiptIndex",
            index
        );

        window.location.href =
            "receipt-details.html";

    });

});
   
});

