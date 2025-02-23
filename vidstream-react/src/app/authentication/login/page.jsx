"use client"
import Link from "next/link";
import "../../css/formStyles.css";
import { useRef, useState } from "react";

async function fetchUsers() {
  try {
    const response = await fetch('../../api/login/CRUD/read-create'); // Fetch to SQL.
    const data = await response.json(); // Convert response to JSON.
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default function loginForm() {
  const inputMailRef = useRef(); // creating refs to get the input values from the form.
  const inputPassRef = useRef();

  const [errorMailState, setErrorMailState] = useState(false);
  const [errorPassState, setErrorPassState] = useState(false);

  var errorMessageMail = "Email not found."; // error messages
  var errorMessagePass = "Invalid password.";

  const checkUser = async (e) => {
    e.preventDefault() // Stops page from reloading
    var data = await fetchUsers()

    var mailInput = inputMailRef.current.value;
    var passInput = inputPassRef.current.value;
    if (data) { // checks if data from Db is existing.
      for (var i = 0; i < data.users.length; i++) { // reads over every item in the Db.
        if (data.users[i].email === mailInput) { // checks if input values are the same in the Db.
          setErrorMailState(false);
        } else {
          setErrorMailState(true);
        }

        if (data.users[i].password_hash === passInput) {
          setErrorPassState(false);
        } else {
          setErrorPassState(true);
        }
      }
    } else {
      console.log("ERROR")
    }
  }

  const removeErrorMessages = () => { // sets the errormessages to false.
    if (errorMailState) {
      setErrorMailState(false)
    }

    if (errorPassState) {
      setErrorPassState(false)
    }
  }

  return (
    <div id="Empty">
      <form className="loginForm" onSubmit={(e) => checkUser(e)}>
        <div className="formInnerWrapper">
          <div className="inputWraper">
            <div className="inputTitle">Email</div>
            <input type="email" name="email" placeholder="user@gmail.com" ref={inputMailRef} required />
            {errorMailState && (<div className="errorMessage">{errorMessageMail}</div>)}
          </div>

          <div className="inputWraper">
            <div className="inputTitle">Password</div>
            <input type="password" name="password" placeholder="Password" ref={inputPassRef} required />
            {errorPassState && (<div className="errorMessage">{errorMessagePass}</div>)}
          </div>

          <div className="submitWrapper">
            <button type="submit">Login</button>
            <button type="reset" onClick={removeErrorMessages}>X</button>
          </div>
          <Link href="/" className="forgotPass">forgot password?</Link>
        </div>
      </form>
    </div>
  )
}