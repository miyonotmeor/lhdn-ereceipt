// ================================
// CAMERA START
// ================================

const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
})
.then(stream => {
    video.srcObject = stream;
})
.catch(err => {
    alert("Camera not supported or permission denied");
});

// ================================
// ELEMENTS
// ================================

const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const uploadInput = document.getElementById("uploadInput");

// ================================
// CORE RECEIPT ENGINE
// ================================

function createReceipt(image, text) {

    const parsed = parseReceipt(text);

    return {
        id: Date.now(),
        image: image,
        amount: parsed.amount,
        date: parsed.date,
        rawText: text,
        status: "pending",
        createdAt: new Date().toISOString()
    };
}

// ================================
// SAVE RECEIPT TO DB
// ================================

function saveReceipt(receipt) {

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

    receipts.push(receipt);

    localStorage.setItem("receipts", JSON.stringify(receipts));

    console.log("SAVED RECEIPT:", receipt);
}

// ================================
// CAPTURE IMAGE (CAMERA)
// ================================

captureBtn.addEventListener("click", async () => {

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    alert("Scanning receipt... please wait");

    const text = await extractTextFromImage(image);

    const receipt = createReceipt(image, text);

    saveReceipt(receipt);

    alert("Receipt scanned successfully!");

    window.location.href = "receipt-result.html?id=" + receipt.id;
});

// ================================
// UPLOAD IMAGE
// ================================

uploadInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = async function(e) {

        const image = e.target.result;

        alert("Scanning uploaded receipt... please wait");

        const text = await extractTextFromImage(image);

        const receipt = createReceipt(image, text);

        saveReceipt(receipt);

        alert("Receipt scanned successfully!");

        window.location.href = "receipt-result.html?id=" + receipt.id;
    };

    reader.readAsDataURL(file);
});

// ================================
// OCR ENGINE
// ================================

async function extractTextFromImage(imageData) {

    const result = await Tesseract.recognize(
        imageData,
        'eng',
        {
            logger: m => console.log(m)
        }
    );

    return result.data.text;
}

// ================================
// RECEIPT PARSER (IMPROVED)
// ================================

function parseReceipt(text) {

    let amount = text.match(/RM\s?\d+(\.\d{2})?/i);
    let date = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);

    return {
        amount: amount ? amount[0] : "RM0.00",
        date: date ? date[0] : "Unknown"
    };
}
