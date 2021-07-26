import React, { useState } from "react";

export const Filebase64 = (props) => {
  const [isUploading, setUploading] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange = async (e) => {
    if (e.target.files.length < 0) {
      return;
    }

    setUploading(true);

    const file = e.target.files[0];

    const base64Encoded = await convertBase64(file);

    props.setFile(base64Encoded);

    setUploading(false);
  };

  return (
    <>
      <input type="file" onChange={handleChange} accept="image/*"></input>
      {isUploading ? (
        <div style={{ color: "red" }}>Please Wait file uploading</div>
      ) : (
        ""
      )}
    </>
  );
};
