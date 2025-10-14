// "use client";
// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// interface EditProductDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: (value: string) => void;
//   title: string;
//   description: string;
//   placeholder: string;
//   defaultValue: string;
//   type?: "text" | "number";
// }

// export default function EditProductDialog({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   description,
//   placeholder,
//   defaultValue,
//   type = "text",
// }: EditProductDialogProps) {
//   const [value, setValue] = useState(defaultValue);

//   const handleConfirm = () => {
//     if (value.trim()) {
//       onConfirm(value.trim());
//       onClose();
//     }
//   };

//   const handleClose = () => {
//     setValue(defaultValue);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="value" className="text-right">
//               Value
//             </Label>
//             <Input
//               id="value"
//               type={type}
//               placeholder={placeholder}
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               className="col-span-3"
//               autoFocus
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm} disabled={!value.trim()}>
//             Confirm
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditProductDialogProps = {
  product: {
    id: string;
    title: string;
    price: number;
  };
  onUpdate: (id: string, data: any) => Promise<void>;
};

export default function EditProductDialog({
  product,
  onUpdate,
}: EditProductDialogProps) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    await onUpdate(product.id, { title, price });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <Button
            variant={"secondary"}
            // size={"lg"}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
