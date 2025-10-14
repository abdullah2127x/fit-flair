// "use client";

// import { useEffect, useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import clsx from "clsx";

// interface DescriptionEditorProps {
//   value?: string;
//   onChange: (value: string) => void;
// }

// export default function DescriptionEditor({
//   value = "",
//   onChange,
// }: DescriptionEditorProps) {
//   const [isMounted, setIsMounted] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   // Only render after component mounts
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: "Describe the product in detail...",
//         emptyEditorClass:
//           "text-muted-foreground before:content-[attr(data-placeholder)] before:italic before:text-slate-400 before:pointer-events-none before:absolute before:left-0 before:top-0",
//       }),
//     ],
//     content: value,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class:
//           "relative min-h-[150px] prose prose-sm max-w-none w-full bg-transparent focus:outline-none rounded-lg transition-colors",
//         tabIndex: 0,
//       },
//       handleDOMEvents: {
//         focus: (view) => {
//           setIsFocused(true);
//           return false;
//         },
//         blur: (view) => {
//           setIsFocused(false);
//           return false;
//         },
//       },
//     },
//   });

//   if (!isMounted || !editor) return null;

//   return (
//     <div className="space-y-2 w-full md:grid-cols-2">
//       <Label>Description</Label>
//       <Card
//         className={clsx(
//           "rounded-lg shadow-sm transition-colors bg-background",
//           isFocused ? "border-2 border-primary ring-2 ring-primary/20" : "border"
//         )}
//       >
//         <CardContent className="p-3">
//           <EditorContent
//             editor={editor}
//             className={clsx(
//               "min-h-[150px] w-full bg-transparent",
//               "focus:outline-none",
//               "rounded-lg transition-shadow",
//               isFocused ? "border-none shadow-none" : ""
//             )}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface DescriptionEditorProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function DescriptionEditor({
  value = "",
  onChange,
}: DescriptionEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  // ✅ Only render after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 🚫 Prevent SSR hydration mismatch and editor re-creation
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!isMounted || !editor) return null;

  return (
    <div className="space-y-2 md:grid-cols-2">
      <Label>Description</Label>
      <Card className="border rounded-lg shadow-sm">
        <CardContent className="p-3">
          <EditorContent
            editor={editor}
            className="prose prose-sm max-w-none focus:outline-none min-h-[150px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
