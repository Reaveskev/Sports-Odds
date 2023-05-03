import React, { useState } from "react";
import axios from "axios";
import styles from "@/styles/dropbox.module.css";
import { useAppContext } from "./GlobalContext";

const DropboxApp = () => {
  const { setUser } = useAppContext();
  const accessToken = process.env.DROPBOX_ACCESS_TOKEN;
  console.log(accessToken);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }
    setUploading(true);

    console.log(accessToken);

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/octet-stream",
      "Dropbox-API-Arg": `{"path": "/${file.name}", "mode": "add", "autorename": true, "mute": false}`,
    };

    console.log(file);

    axios
      .post("https://content.dropboxapi.com/2/files/upload", file, { headers })
      .then((response) => {
        console.log(response);
        axios
          .post(
            "https://api.dropboxapi.com/2/sharing/create_shared_link",
            { path: response.data.path_display },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((sharedLinkResponse) => {
            if (sharedLinkResponse.data.url) {
              let oldimage = sharedLinkResponse.data.url;
              const image = oldimage.replace("dl=0", "raw=1");
              let update_url = "https://sports-odds.herokuapp.com/update_image";
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
          })
          .catch((error) => {
            console.error(error);
            setUploading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setUploading(false);
      });
  };

  return (
    <div className={styles.container}>
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
        <div style={{ display: "flex", alignItems: "center" }}>
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
    </div>
  );
};

export default DropboxApp;
