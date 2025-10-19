"use client"
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const PAGE_SIZE = 5;
const SQUARE_SIZE = 300;

const ImageUploader = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [scale, setScale] = useState(1);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);
  const [imageError, setImageError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [logos, setLogos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const response = await axios.get("https://zoomautos.co.uk/api/Logos");
      setLogos(response.data.reverse()); // Show latest first
    } catch (error) {
      console.error("Error fetching logos:", error);
    }
  };

  const handleDelete = async (id:any) => {
    if (!window.confirm("Are you sure you want to delete this logo?")) return;
    try {
      await axios.delete(`https://zoomautos.co.uk/api/Logos/${id}`);
      fetchLogos(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting logo:", error);
    }
  };

const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result ?? null);
    reader.readAsDataURL(file);
    setImageError("");
  } else {
    setImageError("Please select an image.");
  }
};
  const uploadToCloudinary = async (blob:any) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "checking");
    formData.append("folder", "ZOOM AUTOS");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/db2so7dyd/image/upload",
        formData
      );
      setUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      return null;
    }
  };

  const handleUpload = async () => {
  if (!image) {
    setImageError("Please select an image first.");
    return null;
  }

  return new Promise((resolve) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas is not available");
      resolve(null);
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get 2D context");
      resolve(null);
      return;
    }

    const img = new Image();
    img.onload = async () => {
      canvas.width = SQUARE_SIZE;
      canvas.height = SQUARE_SIZE;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, SQUARE_SIZE, SQUARE_SIZE);

      const scaleFactor = Math.min(SQUARE_SIZE / img.width, SQUARE_SIZE / img.height) * scale;
      const newWidth = img.width * scaleFactor;
      const newHeight = img.height * scaleFactor;
      const adjustedX = (SQUARE_SIZE - newWidth) / 2 + xOffset;
      const adjustedY = (SQUARE_SIZE - newHeight) / 2 + yOffset;

      ctx.drawImage(img, adjustedX, adjustedY, newWidth, newHeight);

      canvas.toBlob(async (blob) => {
        if (blob) {
          const imageUrl = await uploadToCloudinary(blob);
          setUploadedImageUrl(imageUrl);
          resolve(imageUrl);
        } else {
          resolve(null);
        }
      }, "image/jpeg");
    };

    img.src = image as string;
  });
};


  const handleSubmit = async () => {
    try {
      const imageUrl = await handleUpload();
      if (!imageUrl) throw new Error("Image upload failed.");

      await axios.post("https://zoomautos.co.uk/api/Logos", {
        Image: [imageUrl],
        title: "Zoom Autos Logo"
      });

      alert("Logo saved to database successfully!");
      setImage(null);
      setUploadedImageUrl("");
      fetchLogos();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save logo. Please try again.");
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(logos.length / PAGE_SIZE);
  const paginatedLogos = logos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="overalls">
      <div className="mve-form" style={{ textAlign: "center" }}>
        <h1>Upload Logo</h1>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imageError && <p style={{ color: "red" }}>{imageError}</p>}

        {image && (
          <>
            <div
              style={{
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                border: "2px solid red",
                overflow: "hidden",
                margin: "20px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
                {image && typeof image === "string" && (
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: `scale(${scale}) translate(${xOffset}px, ${yOffset}px)`,
                }}
              />
            )}
            </div>

            <label>Resize:</label>
            <input type="range" min="0.5" max="2" step="0.1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
            <br />
            <label>Horizontal Position:</label>
            <input type="range" min="-100" max="100" step="1" value={xOffset} onChange={(e) => setXOffset(parseInt(e.target.value))} />
            <br />
            <label>Vertical Position:</label>
            <input type="range" min="-100" max="100" step="1" value={yOffset} onChange={(e) => setYOffset(parseInt(e.target.value))} />
            <br />
            <button onClick={handleSubmit} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload & Save"}
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          </>
        )}

        <hr />
        <h3>Uploaded Logos</h3>
        {paginatedLogos.length === 0 ? (
          <p>No logos found.</p>
        ) : (
          paginatedLogos.map((logo:any) => (
            <div key={logo._id} style={{ marginBottom: "20px" }}>
              <img src={logo.Image[0]} alt="Logo" style={{ width: 150, height: 150, objectFit: "contain", border: "1px solid #ccc" }} />
              <br />
              <button onClick={() => handleDelete(logo._id)} className="contact-button" style={{ marginTop: "5px"}}>
                Delete
              </button>
            </div>
          ))
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ marginTop: "20px" }}>
            <button className="contact-button" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button className="contact-button" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
