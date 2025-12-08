import React from "react";
import { FileDown } from "lucide-react";
import "./Downloads.scss";

const Downloads = () => {
  const handleDownload = (filename) => {
    const link = document.createElement("a");
    link.href = `/downloads/CKEditor/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="downloads-page">
      <h1>Download CKEditor Component</h1>
      <p className="subtitle">
        Download the component files to integrate into your project
      </p>

      <div className="download-cards">
        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>CKEditorComponent.js</h3>
          <p>The main React component file</p>
          <button
            className="download-btn"
            onClick={() => handleDownload("CKEditorComponent.js")}
          >
            Download JS File
          </button>
        </div>

        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>CKEditorComponent.scss</h3>
          <p>The stylesheet for the component</p>
          <button
            className="download-btn"
            onClick={() => handleDownload("CKEditorComponent.scss")}
          >
            Download SCSS File
          </button>
        </div>
        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>PageManagement.scss</h3>
          <p>The stylesheet for the component</p>
          <button
            className="download-btn"
            onClick={() => handleDownload("PageManagement.scss")}
          >
            Download SCSS File For Web
          </button>
        </div>
      </div>
      <div className="info-box">
        <h3>Ckeditor Config File and Style for Email Template Managment</h3>
      </div>
      <br></br>
      <div className="download-cards">
        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>CKEditor.js</h3>
          <p>The main Ckeditor component file for Email Template Management</p>
          <button
            className="download-btn"
            onClick={() => handleDownload("CKEditor.js")}
          >
            Download JS File
          </button>
        </div>

        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>CKEditorConfig.js</h3>
          <p>
            The main Ckeditor component Config file for Email Template
            Management
          </p>
          <button
            className="download-btn"
            onClick={() => handleDownload("CKEditorConfig.js")}
          >
            Download JS File
          </button>
        </div>

        <div className="download-card">
          <div className="card-icon">
            <FileDown size={48} />
          </div>
          <h3>EmailTemplateStyle.scss</h3>
          <p>The stylesheet for the Email Template</p>
          <button
            className="download-btn"
            onClick={() => handleDownload("EmailTemplateStyle.scss")}
          >
            Download SCSS File
          </button>
        </div>
      </div>

      <div className="info-box">
        <h3>What's next?</h3>
        <p>
          After downloading, check out the{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1DgpycAyeqokw4XRdj2Xk_pR02yfd37Cv4xww3IMyoCA/edit?usp=sharing"
            target="blank"
          >
            Documentation
          </a>{" "}
          page for installation and usage instructions.
        </p>
        <p>
          After reviewing the document, I have compared all the CKEditor
          controls used in Email Template and Page Management. The comparison
          includes toolbar options, available formatting controls, custom
          plugins, and any differences in configuration or behavior between both
          modules.
        </p>
      </div>
    </div>
  );
};

export default Downloads;
