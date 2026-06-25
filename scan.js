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
// CAPTURE IMAGE
// ================================

const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");

captureBtn.addEventListener("click", async () => {

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    // SAVE IMAGE
    localStorage.setItem("lastReceiptImage", image);

    // SHOW LOADING
    alert("Scanning receipt... please wait");

    // OCR PROCESS
    const text = await extractTextFromImage(image);

    console.log("OCR TEXT:", text);

    localStorage.setItem("lastReceiptText", text);

    // PARSE DATA
const parsedData = parseReceipt(text);

// CREATE RECEIPT OBJECT
const receipt = {
    id: Date.now(),
    image: image,
    amount: parsedData.amount,
    date: parsedData.date,
    rawText: text,
    status: "pending"
};

// GET EXISTING RECEIPTS
let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

// ADD NEW RECEIPT
receipts.push(receipt);

// SAVE BACK
localStorage.setItem("receipts", JSON.stringify(receipts));

// OPTIONAL DEBUG
console.log("ALL RECEIPTS:", receipts);

// REDIRECT
alert("Receipt scanned successfully!");
window.location.href = "receipt-result.html?id=" + receipt.id;

// ================================
// UPLOAD IMAGE (OPTION)
// ================================

const uploadInput = document.getElementById("uploadInput");

uploadInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        localStorage.setItem("lastReceiptImage", e.target.result);
        // STEP 1: show success
alert("Receipt scanned successfully!");

// STEP 2: ensure everything is stored properly
let receipts = JSON.parse(localStorage.getItem("receipts")) || [];

receipts.push({
    ...parsedData,
    image: image,
    createdAt: new Date().toISOString(),
    status: "pending"
});

localStorage.setItem("receipts", JSON.stringify(receipts));

// STEP 3: force small delay (IMPORTANT FIX)
setTimeout(() => {
    window.location.href = "receipt-result.html";
}, 300);
    };

    reader.readAsDataURL(file);
});

// ================================
// OCR PROCESS (IMAGE → TEXT)
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
// PARSE RECEIPT DATA
// ================================

function parseReceipt(text) {

    let amount = text.match(/RM\s?\d+(\.\d{2})?/i);
    let date = text.match(/\d{2}[\/\-]\d{2}[\/\-]\d{4}/);

    return {
        amount: amount ? amount[0] : "RM0.00",
        date: date ? date[0] : "Unknown",
        rawText: text
    };
}
