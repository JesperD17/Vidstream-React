import { useState } from 'react';

import { redirect } from 'next/navigation'

export function SearchBar() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    setResult(
      value
    )

    if (value) {
      redirect(`/Search?q=${value}`);
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
    setResult("");
  }

  return {
    handleSubmit, handleChange, result
  };
}
