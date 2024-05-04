import React, { useState } from "react";

function UploadPhoto({ authToken }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("http://localhost:3000/profile/photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Photo uploaded successfully:", data.message);
      } else {
        // Handle error
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Select Photo:
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPhoto;
