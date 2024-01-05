"use client";
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import * as React from "react";

function Editor(props: { onChange: (va: string) => void }) {
  return (
    <RichTextEditorComponent
      change={(e) => {
        props.onChange(e.value as string);
      }}
      height={450}
    >
      <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
    </RichTextEditorComponent>
  );
}

export default Editor;
