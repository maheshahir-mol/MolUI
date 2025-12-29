import { useState } from "react";
import "./EditorPage.scss";
import { useNavigate } from "react-router-dom";
import CKClassicEditor from "../../public/downloads/CKEditor/CKEditorComponent";

const EditorPage = () => {
  const [editorData, setEditorData] = useState("");
  const navigate = useNavigate();

  const handleEditorChange = (data) => {
    setEditorData(data);

    // 🔹 Save to localStorage
    localStorage.setItem("ck-preview-content", data);
  };

  const handlePreview = () => {
    window.open("/previewPage", "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <h2>Editor Page</h2>
      <div className="editor-wrapper">
        <div className="stylekit-for-ckeditor">
          <CKClassicEditor data={editorData} onChange={handleEditorChange} />
        </div>
        <button className="btn" onClick={handlePreview}>Preview</button>
      </div>
    </div>
  );
};

export default EditorPage;