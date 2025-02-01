"use client"

import { useEffect } from "react"

function submitHandler(event) {
  event.preventDefault();
  const { response } = GET()
  console.log("submitted")
  console.log(response)
}

function GET() {
  useEffect(() => {
    let response;
    const fetchData = async () => {
      try {
        const { data } = await fetch('../../api/mail')
        console.log(data)
        response = data.json()
        console.log(response, "aaaa")
  
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
    return response;
  }, [])
}

export default function LoginPage() {
  
  return (
    <form onSubmit={submitHandler}>
      <input type="email" name="email" placeholder="Email" required />

      <input type="password" name="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>
  )
}