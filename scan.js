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

captureBtn.addEventListener("click", () => {

    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");

    localStorage.setItem("lastReceiptImage", image);

    alert("Receipt captured successfully!");

    window.location.href = "dashboard.html";
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
        window.location.href = "dashboard.html";
    };

    reader.readAsDataURL(file);
});
