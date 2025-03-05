"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function pushToSearch() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const router = useRouter(); // Ensure it's inside a client component

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(value);

    if (value) {
      router.push(`/authentication/edit-?q=${value}`);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setResult("");
  };

  return {
    handleSubmit, handleChange, result
  };
}
