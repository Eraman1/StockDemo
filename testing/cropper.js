document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageUpload");
  const cropModal = new bootstrap.Modal(document.getElementById("myModal"));
  const cropImage = document.getElementById("cropImage");
  const cropSaveBtn = document.getElementById("cropSaveBtn");
  const uploadedImage = document.getElementById("uploadedImage");
  const uploadIcon = document.getElementById("uploadIcon");
  const modalBody2 = document.querySelector(".modal-body-2");

  let cropper;

  // Show modal-body-2 when an image is selected
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      cropImage.src = e.target.result;
      modalBody2.style.display = "block"; // Show modal-body-2
    };
    reader.readAsDataURL(file);
  });

  // Initialize Cropper when Image Loads
  cropImage.addEventListener("load", () => {
    if (cropper) cropper.destroy();
    cropper = new Cropper(cropImage, {
      aspectRatio: 1,
      viewMode: 2,
      movable: true,
      zoomable: true,
      scalable: true,
      cropBoxResizable: true,
      minCropBoxWidth: 50,
      minCropBoxHeight: 50,
      ready() {
        const imageData = cropper.getImageData();
        const maxSize = Math.min(200, imageData.width, imageData.height);
        cropper.setCropBoxData({
          left: (imageData.width - maxSize) / 2,
          top: (imageData.height - maxSize) / 2,
          width: maxSize,
          height: maxSize,
        });
      },
    });
  });

  // Crop & Compress Image
  cropSaveBtn.addEventListener("click", async () => {
    if (!cropper) return;

    const croppedCanvas = cropper.getCroppedCanvas({
      width: 200,
      height: 200,
    });

    croppedCanvas.toBlob(
      async (blob) => {
        const compressedBlob = await compressImage(blob);

        // Hide modal-body-2
        modalBody2.style.display = "none";

        // Show compressed image
        showCroppedImage(compressedBlob);
      },
      "image/jpeg",
      0.9
    );
  });

  // Function to Compress Image
  async function compressImage(imageBlob) {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    return await imageCompression(imageBlob, options);
  }

  // Function to Display the Cropped Image
  function showCroppedImage(blob) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage.src = e.target.result;
      uploadedImage.classList.add("show");

      // Hide upload icon
      uploadIcon.style.display = "none";
    };
    reader.readAsDataURL(blob);
  }

  // Trigger file input on clicking the upload icon
  uploadIcon.addEventListener("click", () => {
    fileInput.click();
  });
});
