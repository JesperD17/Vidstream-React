"use client"

export default function LoginPage() {
  function submitHhandler() {
    console.log("submitted")
  }
 
  return (
    <form onSubmit={submitHhandler}>
      <input type="email" name="email" placeholder="Email" required />

      <input type="password" name="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>
  )
}