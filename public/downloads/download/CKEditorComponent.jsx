import { useState, useEffect, useRef } from "react";
import {
  ClassicEditor,
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  // ,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  // FontSize,
  GeneralHtmlSupport,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  // MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  // SpecialCharacters,
  Strikethrough,
  Style,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./CKEditorPagemenment.scss";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { APIURL } from "../../services/axiosServices/ApiEndPoints";

// const UPLOAD_ENDPOINT = `${APIURL}Common/CKEditorImageUpload`;
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((x) =>
        Math.round(255 * x)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function normalizeColor(value) {
  if (!value) return value;

  // hsl(...)
  if (value.startsWith("hsl")) {
    const [h, s, l] = value.match(/[\d.]+/g).map(Number);
    return hslToHex(h, s, l);
  }

  // rgb / rgba
  if (value.startsWith("rgb")) {
    const [r, g, b] = value.match(/[\d.]+/g).map(Number);
    return (
      "#" +
      [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")
    );
  }

  return value; // already hex
}

function forceHexColorPlugin(editor) {
  const commandNames = ["fontColor", "fontBackgroundColor"];

  commandNames.forEach((name) => {
    const command = editor.commands.get(name);
    if (!command) return;

    const originalExecute = command.execute.bind(command);

    command.execute = (options = {}) => {
      if (options.value) {
        options.value = normalizeColor(options.value);
      }
      return originalExecute(options);
    };
  });
}

function CKClassicEditor({ handleChange, ...props }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    extraPlugins: [uploadPlugin, autoHeightImagePlugin, forceHexColorPlugin],
    licenseKey: "GPL",
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "showBlocks",
        "italic",
        "underline",
        "bulletedList",
        "numberedList",
        "fontColor",
        "fontBackgroundColor",
        "strikethrough",
        "fontFamily",
        "|",
        "imageInsert",
        "insertTable",
        "superscript",
        "link",
        "|",
        "alignment",
        "sourceEditing",
        "tableProperties",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      AutoImage,
      AutoLink,
      Autoformat,
      Autosave,
      BlockQuote,
      ShowBlocks,
      Bold,
      CloudServices,
      Code,
      // CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      // FontSize,
      GeneralHtmlSupport,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      // MediaEmbed,
      Paragraph,
      PasteFromOffice,
      SelectAll,

      // SpecialCharacters,
      Strikethrough,
      Style,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      // TextPartLanguage,
      TextTransformation,
      Underline,
      Undo,
      SourceEditing,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    fontColor: {
      colors: [
        { color: "#000000", label: "Black" },
        { color: "#FFFFFF", label: "White" },
        { color: "#FF0000", label: "Red" },
        { color: "#00FF00", label: "Green" },
        { color: "#0000FF", label: "Blue" },
        { color: "#FFA500", label: "Orange" },
        { color: "#808080", label: "Gray" },
      ],
      columns: 5,
      documentColors: 0, // 🚫 disables browser RGBA colors
    },

    fontBackgroundColor: {
      colors: [
        { color: "#FFFFFF", label: "White" },
        { color: "#FFF4CC", label: "Light Yellow" },
        { color: "#CCE5FF", label: "Light Blue" },
        { color: "#D4EDDA", label: "Light Green" },
        { color: "#F8D7DA", label: "Light Red" },
      ],
      columns: 5,
      documentColors: 0, // 🚫 disables RGBA
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        // {
        //   model: "heading5",
        //   view: "h5",
        //   title: "Heading 5",
        //   class: "ck-heading_heading5",
        // },
        // {
        //   model: "heading6",
        //   view: "h6",
        //   title: "Heading 6",
        //   class: "ck-heading_heading6",
        // },
      ],
    },

    image: {
      resizeUnit: "px",
      resizeOptions: [
        {
          name: "resizeImage:original",
          label: "Actual image size",
          value: null,
        },
        // { name: "resizeImage:50", label: "50%", value: "50%" },
        // { name: "resizeImage:75", label: "75%", value: "75%" },
        {
          name: "resizeImage:custom",
          label: "Custom size",
          value: "custom",
        },
      ],
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    contentStyles: [
      // Your default content styles + image styling
      "img { max-width: 100%; height: auto; display: block;}",
    ],
    initialData: "",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
  };

  const editorConfigForEmail = {
    extraPlugins: [uploadPlugin, autoHeightImagePlugin, forceHexColorPlugin],
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "bold",
        "showBlocks",
        "italic",
        "underline",
        "bulletedList",
        "numberedList",
        "fontColor",
        "fontBackgroundColor",
        "strikethrough",
        "fontFamily",
        "|",
        "imageInsert",
        "insertTable",
        "superscript",
        "link",
        "|",
        "alignment",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      AutoImage,
      AutoLink,
      Autoformat,
      Autosave,
      //BlockQuote,
      ShowBlocks,
      Bold,
      CloudServices,
      Code,
      // CodeBlock,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      // FontSize,
      GeneralHtmlSupport,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      // MediaEmbed,
      Paragraph,
      PasteFromOffice,
      SelectAll,

      // SpecialCharacters,
      Strikethrough,
      Style,
      Superscript,
      // Table,
      // TableCaption,
      // TableCellProperties,
      // TableColumnResize,
      // TableProperties,
      // TableToolbar,
      // TextPartLanguage,
      TextTransformation,
      Underline,
      Undo,
      SourceEditing,
    ],
    balloonToolbar: [
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        // {
        //   model: "heading5",
        //   view: "h5",
        //   title: "Heading 5",
        //   class: "ck-heading_heading5",
        // },
        // {
        //   model: "heading6",
        //   view: "h6",
        //   title: "Heading 6",
        //   class: "ck-heading_heading6",
        // },
      ],
    },

    image: {
      resizeUnit: "px",
      resizeOptions: [
        {
          name: "resizeImage:original",
          label: "Actual image size",
          value: null,
        },
        // { name: "resizeImage:50", label: "50%", value: "50%" },
        // { name: "resizeImage:75", label: "75%", value: "75%" },
        {
          name: "resizeImage:custom",
          label: "Custom size",
          value: "custom",
        },
      ],
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    contentStyles: [
      // Your default content styles + image styling
      "img { max-width: 100%; height: auto; display: block;}",
    ],
    initialData: "",
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    menuBar: {
      isVisible: true,
    },
    placeholder: "Type or paste your content here!",
    // table: {
    //   contentToolbar: [
    //     "tableColumn",
    //     "tableRow",
    //     "mergeTableCells",
    //     "tableProperties",
    //     "tableCellProperties",
    //   ],
    // },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
  };

  function autoHeightImagePlugin(editor) {
    editor.model.document.on("change:data", () => {
      editor.model.change((writer) => {
        const root = editor.model.document.getRoot();
        const range = editor.model.createRangeIn(root);
        for (const { item } of range.getWalker()) {
          if (item.name === "imageBlock" || item.name === "imageInline") {
            if (item.hasAttribute("height")) {
              writer.setAttribute("height", "auto", item);
            }
          }
        }
      });
    });
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            body.append("filename", file.filename);
            axios
              .post(`${UPLOAD_ENDPOINT}`, body, {
                headers: { "content-type": "multipart/form-data" },
              })
              .then((response) => {
                if (response?.status == 200 && response?.data.location)
                  resolve({ default: `${response.data.location}` });
                else {
                  throw new Error("Network response was not ok!!");
                }
              })
              .catch((error) => {
                window.alert(`Upload failed: ${error?.message}`);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <div className="stylekit-for-ckeditor" ref={editorContainerRef}>
      <div ref={editorRef}>
        {isLayoutReady && (
          <CKEditor
            key={props?.isEmailCk ? "EmailCk" : "Default"}
            editor={ClassicEditor}
            data={props.data}
            config={props?.isEmailCk ? editorConfigForEmail : editorConfig}
            onReady={(editor) => {
              let isInternalDrag = false;

              // 1️⃣ Mark start of internal drag
              editor.editing.view.document.on("dragstart", () => {
                isInternalDrag = true;
              });

              // 2️⃣ Reset flag after drop
              editor.editing.view.document.on("drop", () => {
                setTimeout(() => (isInternalDrag = false), 0);
              });

              // 3️⃣ Handle paste / clipboard input
              editor.editing.view.document.on("clipboardInput", (evt, data) => {
                const html = data.dataTransfer.getData("text/html");

                // Only clean inline styles for *external* paste
                if (html && !isInternalDrag) {
                  const tempDiv = document.createElement("div");
                  tempDiv.innerHTML = html;

                  // Remove inline styles
                  tempDiv.querySelectorAll("[style]").forEach((el) => {
                    el.removeAttribute("style");
                  });

                  const cleanHTML = tempDiv.innerHTML;
                  data.content = editor.data.processor.toView(cleanHTML);
                }
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              props.onChange(data, editor);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default CKClassicEditor;
