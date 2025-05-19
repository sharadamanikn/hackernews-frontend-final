"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/posts/create-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submit failed:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-indigo-600 text-white text-lg font-semibold px-6 py-4">
          Submit a Post
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* URL input disabled */}
          {/* <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              id="url"
              type="text"
              disabled
              placeholder="(optional - currently disabled)"
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-500"
            />
          </div> */}

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm h-32 resize-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md text-white font-medium transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Optional note */}
          {/* <p className="text-xs text-gray-500">
            Leave URL blank to submit a discussion. If there's no URL, text will appear at the top of the thread.
          </p> */}
        </form>
      </div>
    </div>
  );
}
