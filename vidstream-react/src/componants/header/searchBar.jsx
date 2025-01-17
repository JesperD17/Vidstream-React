import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SearchBar() {
  const navigate = useNavigate();
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
