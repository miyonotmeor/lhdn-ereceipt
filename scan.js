
/* ==========================================================
   LHDN E-Receipt
   Smart Receipt Scan
   Part 1
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cameraButton = document.getElementById("cameraButton");
    const galleryButton = document.getElementById("galleryButton");
    const receiptImage = document.getElementById("receiptImage");

    const previewImage = document.getElementById("previewImage");
    const previewPlaceholder = document.getElementById("previewPlaceholder");

    const continueButton = document.getElementById("continueButton");
    const changeImageButton = document.getElementById("changeImageButton");

    /* --------------------------------------------
       Initial State
    --------------------------------------------- */

    continueButton.disabled = true;

    previewImage.style.display = "none";

    /* --------------------------------------------
       Camera Button
    --------------------------------------------- */

    cameraButton.addEventListener("click", () => {

        receiptImage.setAttribute("capture", "environment");

        receiptImage.click();

    });

    /* --------------------------------------------
       Gallery Button
    --------------------------------------------- */

    galleryButton.addEventListener("click", () => {

        receiptImage.removeAttribute("capture");

        receiptImage.click();

    });

    /* --------------------------------------------
       Change Image
    --------------------------------------------- */

    changeImageButton.addEventListener("click", () => {

        receiptImage.click();

    });

    /* --------------------------------------------
       Image Selected
    --------------------------------------------- */

    receiptImage.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {

            return;

        }

        const reader = new FileReader();

        reader.onload = function (e) {

            previewImage.src = e.target.result;

            previewImage.style.display = "block";

            previewPlaceholder.style.display = "none";

            continueButton.disabled = false;

            localStorage.setItem(

                "selectedReceipt",

                e.target.result

            );

        };

        reader.readAsDataURL(file);

    });

});

/* ==========================================================
   LHDN E-Receipt
   Smart Receipt Scan
   Part 2
========================================================== */

/* --------------------------------------------
   Continue Button
--------------------------------------------- */

continueButton.addEventListener("click", () => {

    const selectedReceipt =
        localStorage.getItem("selectedReceipt");

    if (!selectedReceipt) {

        alert("Please select a receipt first.");

        return;

    }

    window.location.href = "extract.html";

});

/* --------------------------------------------
   Restore Previous Receipt Preview
--------------------------------------------- */

const savedReceipt =
    localStorage.getItem("selectedReceipt");

if (savedReceipt) {

    previewImage.src = savedReceipt;

    previewImage.style.display = "block";

    previewPlaceholder.style.display = "none";

    continueButton.disabled = false;

}
