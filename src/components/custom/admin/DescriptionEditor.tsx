// "use client";

// import { useEffect, useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";

// interface DescriptionEditorProps {
//   value?: string;
//   onChange: (value: string) => void;
// }

// export default function DescriptionEditor({
//   value = "",
//   onChange,
// }: DescriptionEditorProps) {
//   const [isMounted, setIsMounted] = useState(false);

//   // ✅ Only render after component mounts
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // 🚫 Prevent SSR hydration mismatch and editor re-creation
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: value,
//     immediatelyRender: false,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   if (!isMounted || !editor) return null;

//   return (
//     <div className="space-y-2 md:grid-cols-2">
//       <Label>Description</Label>
//       <Card className="border rounded-lg shadow-sm">
//         <CardContent className="p-3">
//           <EditorContent
//             editor={editor}
//             className="prose prose-sm max-w-none focus:outline-none min-h-[150px]"
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
