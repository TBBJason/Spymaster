import React from "react";
import PropTypes from "prop-types";

/**
 * Safe renderer for API/other errors so React never tries to render a raw object.
 * Returns React nodes (strings, divs, <pre>, etc.)
 */
const renderErrorContent = (err) => {
  if (err == null) return null;
  if (typeof err === "string") return err;

  // If axios/FastAPI style: err could be { response: { data: { detail: [...] }}} or just the detail array
  const maybeData = err?.response?.data ?? err;

  // FastAPI: detail could be an array of validation objects
  if (Array.isArray(maybeData?.detail)) {
    return (
      <div>
        {maybeData.detail.map((d, i) => (
          <div key={i}>
            {typeof d === "string" ? d : d.msg ?? JSON.stringify(d)}
          </div>
        ))}
      </div>
    );
  }

  // If detail is a string
  if (typeof maybeData?.detail === "string") return maybeData.detail;

  // If it's an array (not under detail)
  if (Array.isArray(maybeData)) {
    return (
      <div>
        {maybeData.map((item, i) => (
          <div key={i}>{typeof item === "string" ? item : item.msg ?? JSON.stringify(item)}</div>
        ))}
      </div>
    );
  }

  // If it's an object with message field
  if (typeof maybeData === "object") {
    if (maybeData.message) return typeof maybeData.message === "string" ? maybeData.message : JSON.stringify(maybeData.message);
    // fallback to pretty JSON
    try {
      return <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(maybeData, null, 2)}</pre>;
    } catch {
      return String(maybeData);
    }
  }

  // final fallback
  return String(err);
};

const UploadSection = ({
  fileInputRef,
  isUploading,
  file,
  handleUpload,
  handleClear,
  error,
  setFile,
}) => {
  return (
    <div>
      <h2>Upload an Image</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => {
          const chosen = e?.target?.files?.[0] ?? null;
          setFile(chosen);
        }}
        disabled={isUploading}
      />

      {file && (
        <div style={{ marginTop: 8 }}>
          <strong>Selected:</strong> {file.name}
        </div>
      )}

      <div style={{ margin: "10px 0" }}>
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !file}
          style={{ marginRight: "10px" }}
        >
          {isUploading ? "Processing..." : "Upload"}
        </button>

        <button type="button" onClick={handleClear} disabled={isUploading}>
          Clear
        </button>
      </div>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          style={{ color: "red", margin: "10px 0", whiteSpace: "pre-wrap" }}
        >
          {renderErrorContent(error)}
        </div>
      )}
    </div>
  );
};

UploadSection.propTypes = {
  fileInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  isUploading: PropTypes.bool,
  file: PropTypes.object,
  handleUpload: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  error: PropTypes.any,
  setFile: PropTypes.func.isRequired,
};

UploadSection.defaultProps = {
  isUploading: false,
  file: null,
  error: null,
  fileInputRef: null,
};

export default UploadSection;
