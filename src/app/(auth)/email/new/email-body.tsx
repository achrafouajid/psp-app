"use client";

import { useState } from "react";
import Editor from "../../(blog)/add-blog/Editor";

export function EmailBody() {
  const [content, setcontent] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "Enter" || e.key === "NumpadEnter")
    ) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div>
      <textarea
        name="body"
        rows={20}
        className="border-none bg-white dark:bg-gray-950 text-black dark:text-white px-3 py-2 focus:outline-none w-full mt-2"
        required
        onKeyDown={handleKeyDown}
      />
      <Editor onChange={setcontent} />
    </div>
  );
}
