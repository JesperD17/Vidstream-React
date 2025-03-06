"use client"
import Link from "next/link";
import "../../css/formStyles.css";
import { useRef, useState, useEffect } from "react";

async function fetchUsers() {
  try {
    const response = await fetch('../../api/login/CRUD/read-create'); // Fetch to SQL.
    const data = await response.json(); // Convert response to JSON.
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function dbStatus() {
  var data = await fetchUsers();
  var status = false;
  if (data.users) { // data.users does not exist when there is an error from the Db.
    status = true;
  } else {
    status = false;
  }
  return status;
}

export default function loginForm() {
  const inputMailRef = useRef(); // creating refs to get the input values from the form.
  const inputPassRef = useRef();

  const [errorMailState, setErrorMailState] = useState(false);
  const [errorPassState, setErrorPassState] = useState(false);

  const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.

  var errorMessageMail = "Email not found."; // error messages
  var errorMessagePass = "Invalid password.";

  useEffect(() => {
    async function checkDbStatus() {
      const result = await dbStatus();
      // console.log("db status = ", result)
      setStatus(result);
    }
    checkDbStatus();
  }, []);

  const checkUser = async (e) => {
    e.preventDefault() // Stops page from reloading

    var mailInput = inputMailRef.current.value;
    var passInput = inputPassRef.current.value;

    var data = await fetchUsers()
    if (data) { // checks if data from Db is existing.
      let foundUser = false;
      for (var i = 0; i < data.users.length; i++) { // reads over every item in the Db.
        if (data.users[i].email === mailInput) { // checks if input values are the same in the Db.
          setErrorMailState(false);

          foundUser = true;

          if (data.users[i].password_hash === passInput) { // checks the password in the same mail index.
            setErrorPassState(false);
          } else {
            setErrorPassState(true);
          }
          break;
        }
      }
      if (!foundUser) {
        setErrorMailState(true);
        setErrorPassState(true);
      }
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
        {!status && (
          <div className="offlineDbWrapper">
            <div className="offlineDbText">
              This page is NOT receiving data at the moment.
            </div>
          </div>
        )}
        <div className="formInnerWrapper">
          <div className="inputWraper">
            <div className="inputTitle">Email</div>
            <input type="email" name="email" placeholder="user@gmail.com" ref={inputMailRef} className={`${errorMailState ? 'errorMessage errorBorder' : ''}`} required />
            {errorMailState && (<div className="errorMessage">{errorMessageMail}</div>)}
          </div>

          <div className="inputWraper">
            <div className="inputTitle">Password</div>
            <input type="password" name="password" placeholder="Password" ref={inputPassRef}
              className={`${errorPassState ? 'errorMessage errorBorder' : ''}`}
              required
              minLength={6}
              maxLength={15}
              pattern=".*[\d\W].*" // .* Allows any characters before or after the required part. \d → A digit. \W → A non-word character. .* → Allows any characters before or after the match.
              title="Password must be 6-15 characters long & include at least 1 number or special character (@, #, $)." />
            {errorPassState && (<div className="errorMessage">{errorMessagePass}</div>)}
          </div>

          <div className="outerSubmitWrapper">
            <div className="submitWrapper">
              <button type="submit">Login</button>
              <button type="reset" onClick={removeErrorMessages}>X</button>
            </div>
          </div>
          <Link href="/authentication/reset-password" className="forgotPass">forgot password?</Link>
        </div>
      </form>
    </div>
  )
}