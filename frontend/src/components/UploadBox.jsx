
import { useState } from "react";
import "../styles/home.css";

function UploadBox() {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  // Summary counts
  const [totalRows, setTotalRows] = useState(0);
  const [validRows, setValidRows] = useState(0);
  const [invalidRows, setInvalidRows] = useState(0);

  // Download URL
  const [downloadUrl, setDownloadUrl] = useState("");
  const [chunks, setChunks] = useState([]);

  const handleFile = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setUploadMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://transguard-ai-backend.onrender.com/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("BACKEND RESPONSE:", data);

      setUploadMessage(data.message || "");
      setPreview(data.preview || []);

      // Summary values
      setTotalRows(data.totalRows || 0);
      setValidRows(data.validRows || 0);
      setInvalidRows(data.invalidRows || 0);

      // Download link
      setDownloadUrl(data.downloadUrl || "");
      setChunks(data.chunks || []);    
    } catch (error) {
      console.error(error);

      setUploadMessage("❌ Upload failed");
      setPreview([]);

      setTotalRows(0);
      setValidRows(0);
      setInvalidRows(0);

      setDownloadUrl("");
      setChunks([]);
    }
  };

  return (
    <div className="upload-card" id="upload-section">
      <h2>📂 Upload Transaction CSV</h2>

      <p>Select a CSV file to validate and preview.</p>

      <input type="file" accept=".csv" onChange={handleFile} />

      {fileName && (
        <p>
          <strong>Selected File:</strong> {fileName}
        </p>
      )}

      {uploadMessage && (
        <p>
          <strong>Status:</strong> {uploadMessage}
        </p>
      )}

      {/* Summary */}
      {totalRows > 0 && (
        <div
          style={{
            display: "flex",
            gap: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "15px",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          <span>📊 Total Rows: {totalRows}</span>

          <span style={{ color: "#22c55e" }}>
            ✅ Valid: {validRows}
          </span>

          <span style={{ color: "#ef4444" }}>
            ❌ Invalid: {invalidRows}
          </span>
        </div>
      )}

      {/* Download Button */}
      {downloadUrl && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <a
            href={downloadUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "#16a34a",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ⬇️ Download Validated CSV
          </a>
        </div>
      )}
      {chunks.length > 0 && (
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <h3>📦 Download Split Files</h3>

    {chunks.map((chunk, index) => (
      <div key={index} style={{ margin: "10px 0" }}>
        <a
          href={chunk.url}
          target="_blank"
          rel="noreferrer"
        >
          ⬇️ Download {chunk.name}
        </a>
      </div>
    ))}
  </div>
)}

      {preview.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            overflowX: "auto",
            width: "100%",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "1200px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                {Object.keys(preview[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      border: "1px solid #555",
                      padding: "10px",
                      background: "#1e293b",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {preview.map((row, index) => (
                <tr key={index}>
                  {Object.keys(preview[0]).map((key) => (
                    <td
                      key={key}
                      style={{
                        border: "1px solid #555",
                        padding: "10px",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {String(row[key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
