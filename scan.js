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

    localStorage.setItem("lastReceiptData", JSON.stringify(parsedData));

    alert("Receipt scanned successfully!");

    window.location.href = "receipt-result.html";
});

// ================================
// UPLOAD IMAGE (OPTION)
// ================================

const uploadInput = document.getElementById("uploadInput");

uploadInput.addEventListener("change", (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = function(e) {
        localStorage.setItem("lastReceiptImage", e.target.result);
        alert("Receipt uploaded successfully!");
        window.location.href = "receipt-result.html";
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
