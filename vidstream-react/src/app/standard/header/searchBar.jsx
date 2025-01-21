import { useRouter } from 'next/compat/router';
import { useState } from 'react';

export function SearchBar() {
  const navigate = useRouter();
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    setResult(
      value
    )

    if (value) {
      navigate(`/Search?q=${value}`);
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
