// ================================
// CAMERA START
// ================================

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const uploadInput = document.getElementById("uploadInput");

let isProcessing = false;

// ================================
// CAMERA INIT (SAFE VERSION)
// ================================

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        });
        video.srcObject = stream;
    } catch (err) {
        alert("Camera not supported or permission denied");
        console.error(err);
    }
}

startCamera();

// ================================
// CORE RECEIPT ENGINE (LOCAL)
// ================================

function createReceipt(image, text) {

    const parsed = parseReceipt(text);

    return {
        id: "RCPT-" + Date.now(),
        image: image,
        amount: parsed.amount,
        date: parsed.date,
        rawText: text || "",
        status: "pending",
        createdAt: new Date().toISOString()
    };
}

// ================================
// SAVE TO LOCAL DB
// ================================

function saveReceipt(receipt) {

    let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

    receipts.push(receipt);

    localStorage.setItem("receipts", JSON.stringify(receipts));

    console.log("✅ SAVED RECEIPT:", receipt);
}

// ================================
// OCR ENGINE
// ================================

async function extractTextFromImage(imageData) {

    const result = await Tesseract.recognize(
        imageData,
        "eng",
        {
            logger: m => console.log(m)
        }
    );

    return result.data.text;
}

// ================================
// RECEIPT PARSER (IMPROVED)
// ================================

function parseReceipt(text = "") {

    const amountMatch = text.match(/RM\s?\d+(\.\d{2})?/i);
    const dateMatch = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);

    return {
        amount: amountMatch ? amountMatch[0] : "RM0.00",
        date: dateMatch ? dateMatch[0] : "Unknown"
    };
}

// ================================
// PROCESS ENGINE (UNIFIED)
// ================================

async function processReceipt(image) {

    if (isProcessing) return;
    isProcessing = true;

    try {

        alert("Scanning receipt... please wait");

        const text = await extractTextFromImage(image);

        const receipt = createReceipt(image, text);

        saveReceipt(receipt);

        alert("Receipt scanned successfully!");

        window.location.href = "receipt-result.html?id=" + receipt.id;

    } catch (err) {

        console.error("OCR ERROR:", err);
        alert("Failed to scan receipt. Try again.");

    } finally {
        isProcessing = false;
    }
}

// ================================
// CAPTURE FROM CAMERA
// ================================

captureBtn.addEventListener("click", async () => {

    if (isProcessing) return;

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    await processReceipt(image);
});

// ================================
// UPLOAD IMAGE
// ================================

uploadInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file) {
        alert("No file selected");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function(e) {

        const image = e.target.result;

        await processReceipt(image);
    };

    reader.readAsDataURL(file);
});
