import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./CkEditor.scss";
import TooltipComponent from "../../tooltip/TooltipComponent";
import { editorConfig } from "./CkEditorConfig";

const CKEditorComponent = ({
  data,
  isdisable,
  placeholder,
  onCKEditorChange,
  inputInfoConfig,
  ...editorProps
}) => {
  const [editorData, setEditorData] = useState(data || "<div></div>"); // Initialize with empty div or provided data

  // Update the state when the data prop changes (external data change)
  useEffect(() => {
    setEditorData(data);
  }, [data]);

  return (
    <div className="ckeditor-style-for-emailtemplate">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onReady={(editor) => {
          editor.editing.view.document.on("clipboardInput", (evt, data) => {
            const html = data.dataTransfer.getData("text/html");

            if (html) {
              // Create a temporary DOM element
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = html;

              // Remove all inline styles
              tempDiv.querySelectorAll("[style]").forEach((el) => {
                el.removeAttribute("style");
              });

              // Cleaned HTML
              const cleanHTML = tempDiv.innerHTML;

              // Replace the pasted data
              data.content = editor.data.processor.toView(cleanHTML);
            }
          });
        }}
        onChange={(event, editor) => {
          const newData = editor.getData();
          if (newData !== editorData) {
            setEditorData(newData);
            onCKEditorChange(newData, editor);
          }
        }}
        config={editorConfig}
        disabled={isdisable}
        {...editorProps}
      />

      {inputInfoConfig?.isInfoIcon && (
        <TooltipComponent
          iconName={inputInfoConfig?.iconName}
          message={inputInfoConfig?.message}
        />
      )}
    </div>
  );
};

CKEditorComponent.propTypes = {
  data: PropTypes.string,
  isdisable: PropTypes.bool,
  onCKEditorChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  editorProps: PropTypes.shape({
    config: PropTypes.shape({
      toolbar: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  inputInfoConfig: PropTypes.shape({
    isInfoIcon: PropTypes.bool,
    iconName: PropTypes.string,
    message: PropTypes.string,
  }),
};

CKEditorComponent.defaultProps = {
  data: "",
  isdisable: false,
  editorProps: {},
};

export default CKEditorComponent;
