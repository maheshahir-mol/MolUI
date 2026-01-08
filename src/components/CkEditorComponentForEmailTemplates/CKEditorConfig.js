import {
  AccessibilityHelp,
  Alignment,
  AutoImage,
  AutoLink,
  Autoformat,
  Autosave,
  // BlockQuote,
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
  ShowBlocks,
  List,
  // MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SourceEditing,
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
} from "ckeditor5";
// import { APIURL } from "../../services/axiosServices/ApiEndPoints";

export const editorConfig = {
  licenseKey: "GPL",
  extraPlugins: [uploadPlugin, autoHeightImagePlugin],
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
      // "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "strikethrough",
      "fontFamily",
      "|",
      "imageInsert",
      // 'mediaEmbed',
      // "insertTable",
      // "insertTable",
      // "blockQuote",
      "superscript",
      // 'specialCharacters',
      "link",
      // 'codeBlock',
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
    // BlockQuote,
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
  image: {
    resizeUnit: "px",
    resizeOptions: [
      { name: "resizeImage:original", label: "Original", value: null },
      { name: "resizeImage:50", label: "50%", value: "50" },
      { name: "resizeImage:75", label: "75%", value: "75" },
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
  clipboard: {
    pasteAsPlainText: true, // forces plain text paste
  },
};

class MyCustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;
      const response = await this._sendRequest(file);

      if (!response || response?.error) {
        window.alert(`Upload failed: ${response?.error?.message}`);
        throw new Error(
          response?.error ? response?.error?.message : "Upload failed."
        );
      }
      return {
        default: response?.location,
      };
    } catch (error) {
      window.alert(`Upload failed: ${error?.message}`);
      throw new Error(`Upload failed: ${error?.message}`);
    }
  }

  async _sendRequest(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${APIURL}Common/CKEditorImageUpload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok!!");
    }

    return await response.json();
  }
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyCustomUploadAdapter(loader);
  };
}

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
