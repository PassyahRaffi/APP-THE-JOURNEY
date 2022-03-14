import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class RichText extends Component {
  render() {
    return (
      <div className="App">
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          //   onReady={(editor) => {
          //     // You can store the "editor" and use when it is needed.
          //     console.log("Editor is ready to use!", editor);
          //   }}
          //   onBlur={(event, editor) => {
          //     console.log("Blur.", editor);
          //   }}
          //   onFocus={(event, editor) => {
          //     console.log("Focus.", editor);
          //   }}
        />
      </div>
    );
  }
}

export default RichText;
