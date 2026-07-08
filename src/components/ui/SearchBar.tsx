"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "What do you want to listen to?",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div
      className="relative group max-w-md"
      style={{ color: "var(--text-primary)" }}
    >
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "var(--text-subtext)" }} />
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 rounded-full text-sm outline-none transition-all duration-200 border"
        style={{
          backgroundColor: "var(--bg-hover)",
          color: "var(--text-primary)",
          borderColor: query ? "var(--accent)" : "transparent",
        }}
      />
      {query && (
        <button
          onClick={() => handleChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="w-3.5 h-3.5" style={{ color: "var(--text-subtext)" }} />
        </button>
      )}
    </div>
  );
}
