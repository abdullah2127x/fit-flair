"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // 👈 Import toast from sonner

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ Show success toast
      toast.success("🎉 Subscribed successfully!");
      setEmail("");
    } catch (err: any) {
      // ❌ Show error toast
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-x-2">
      <Input
        placeholder="Enter email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1"
        disabled={loading}
      />
      <Button
        size="sm"
        variant="secondary"
        type="submit"
        disabled={loading}
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
