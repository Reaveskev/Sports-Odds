import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/dropbox.module.css";
import { useAppContext } from "./GlobalContext";

const DropboxApp = () => {
  const { setUser } = useAppContext();
  const [uploading, setUploading] = useState(false);
  ////
  const [file, setFile] = useState(null);

  async function handleUpload(event) {
    event.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    // let dropBox = "http://127.0.0.1:5000/api/dropbox/upload";
    let dropBox = "https://sports-odds.herokuapp.com/api/dropbox/upload";
    const response = await axios.post(dropBox, formData);

    // const data = await response.json();
    const data = response.data;

    let oldimage = data.url;

    const image = oldimage.replace("dl=0", "raw=1");
    let update_url = "https://sports-odds.herokuapp.com/api/update_image";
    // let update_url = "http://127.0.0.1:5000/update_image";

    axios
      .post(update_url, {
        image,
      })
      .then((res) => {
        if (res.status === 200) setUser(res.data);
        setUploading(false);
      });
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  return (
    <div className={styles.container}>
      <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleUpload}
      >
        <input
          type="file"
          name="file"
          id="file"
          className={styles.fileInput}
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label htmlFor="file" className={styles.uploadLabel}>
          Choose a file
        </label>
        {file && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p className={styles.fileUrl}>Upload {file.name}?</p>{" "}
          </div>
        )}
        <button
          className={styles.uploadButton}
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default DropboxApp;
