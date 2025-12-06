import React from "react";
import "./Documentation.scss";

const Documentation = () => {
  return (
    <div className="documentation-page">
      <h1>How to Use CKEditor Component</h1>

      <section className="doc-section">
        <h2>Installation</h2>
        <p>
          Follow these steps to integrate the CKEditor component into your
          project:
        </p>

        <div className="step">
          <h3>Step 1: Install Dependencies</h3>
          <p>First, install the required CKEditor packages in your project:</p>
          <pre>
            <code>
              npm install @ckeditor/ckeditor5-react
              @ckeditor/ckeditor5-build-classic
            </code>
          </pre>
        </div>

        <div className="step">
          <h3>Step 2: Download Component Files</h3>
          <p>
            Go to the <a href="/downloads">Downloads</a> page and download both:
          </p>
          <ul>
            <li>
              <code>CKEditorComponent.js</code>
            </li>
            <li>
              <code>CKEditorComponent.scss</code>
            </li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 3: Copy Files to Your Project</h3>
          <p>Create a folder in your project and copy the downloaded files:</p>
          <pre>
            <code>
              src/components/CKEditorComponent/ ├── CKEditorComponent.js └──
              CKEditorComponent.scss
            </code>
          </pre>
        </div>

        <div className="step">
          <h3>Step 4: Import and Use</h3>
          <p>Import the component in your React file:</p>
          <pre>
            <code>
              import CKEditorComponent from
              './components/CKEditorComponent/CKEditorComponent';
            </code>
          </pre>
          <p>Then use it in your JSX:</p>
          <pre>
            <code>&lt;CKEditorComponent /&gt;</code>
          </pre>
        </div>
      </section>
      <section className="doc-section">
        <h2>For Web Output</h2>
        <p>
          Follow these steps to check the Page Management web output and match
          it with the admin preview:
        </p>

        <div className="step">
          <h3>Step 1: Download PageManagement.scss File</h3>
          <p>
            First, download the required SCSS file for page management styling:
          </p>
          <pre>
            <code>PageManagement.scss</code>
          </pre>
        </div>

        <div className="step">
          <h3>Step 2: Put File in pageManagement Folder</h3>
          <p>
            Place the downloaded SCSS file inside the{" "}
            <code>pageManagement</code> folder in your project:
          </p>
          <pre>
            <code>src/pages/pageManagement/ └── PageManagement.scss</code>
          </pre>
        </div>

        <div className="step">
          <h3>Step 3: Apply CSS Class</h3>
          <p>
            Use the following class wherever you render Page Management CKEditor
            data:
          </p>
          <pre>
            <code>ck-edotor-data-common-page-manage</code>
          </pre>
        </div>

        <div className="step">
          <h3>Step 4: Check Output</h3>
          <p>
            Run your project and compare the web output with the admin panel
            preview to ensure both match.
          </p>
        </div>
      </section>

      <section className="doc-section">
        <h2>Configuration</h2>
        <p>
          The component can be customized by passing props or modifying the
          configuration in the component file.
        </p>
      </section>

      <section className="doc-section">
        <h2>Support</h2>
        <p>
          For more information about CKEditor, visit the official documentation
          at{" "}
          <a
            href="https://ckeditor.com/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ckeditor.com/docs
          </a>
        </p>
      </section>
    </div>
  );
};

export default Documentation;
