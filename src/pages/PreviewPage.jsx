import { useEffect, useState } from "react";
import "./PreviewPage.scss"

const PreviewPage = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedContent = localStorage.getItem("ck-preview-content");
    if (storedContent) {
      setContent(storedContent);
    }
  }, []);

  return (
    <div className="ck-preview-wrapper">
      <div
        className="pagemanagment-wrapper"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PreviewPage;
