"use client"
import "../../css/formStyles.css"

import { useRef, useState } from "react";

async function fetchUsers() {
    try {
        const response = await fetch('../../api/login/CRUD/read-create'); // Fetch to SQL.
        const data = await response.json(); // Convert response to JSON.
        return data;
    } catch (error) {
        console.error(error);
        return undefined
    }
}

async function dbStatus() {
    var data = await fetchUsers();
    var status = false;
    console.log(data)
    if(data) {
        status = true;
    } else {
        status = false;
    }
    console.log(status)

    return status;
}

export default function register() {
    const inputNameRef = useRef();
    const inputMailRef = useRef();
    const inputPassRef = useRef();

    const [errorNameState, setErrorNameState] = useState(false)
    const [errorMailState, setErrorMailState] = useState(false);
    const [errorPassState, setErrorPassState] = useState(false);

    var errorMessageName = "Name already exists.";
    var errorMessageMail = "Email already exists.";
    var errorMessagePass = "Password already exists.";

    var status = dbStatus();

    const addInfoToDb = async (e) => {
        e.preventDefault()

        console.log(status)

        var nameInput = inputNameRef.current.value;
        var mailInput = inputMailRef.current.value;
        var passInput = inputPassRef.current.value;

        const formData = [nameInput, mailInput, passInput];

        setErrorNameState(false);
        setErrorMailState(false);
        var data = await fetchUsers()

        if (data) { // checks if data from Db is existing.
            for (var i = 0; i < data.users.length; i++) { // reads over every item in the Db.
                if (data.users[i].name === nameInput) { // checks the password in the same mail index.
                    setErrorNameState(true);
                }
                
                if (data.users[i].email === mailInput) { // checks if input values are the same in the Db.
                    setErrorMailState(true);
                }
            }
            if (errorNameState && errorMailState) {
                return
            }
        }

        // post requesst towards database for new user.
        try {
            const response = await fetch('/api/login/CRUD/read-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await response.json();

            if (!response.ok) { // if name, mail and or password already exist, this error happens.
                console.log("error");
            } else {
                console.log("succesful creation")
            }

        } catch (error) {
            console.error(error);
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
            <form className="registerForm" onSubmit={(e) => addInfoToDb(e)}>
                <div className="formInnerWrapper">

                    <div className="inputWraper">
                        <div className="inputTitle">Username</div>
                        <input type="text" name="name" placeholder="Name" ref={inputNameRef} required />
                        {errorNameState && (<div className="errorMessage">{errorMessageName}</div>)}
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Email</div>
                        <input type="email" name="email" placeholder="Email" ref={inputMailRef} required />
                        {errorMailState && (<div className="errorMessage">{errorMessageMail}</div>)}
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Password</div>
                        <input type="password" name="password" placeholder="Password" ref={inputPassRef} required />
                        {errorPassState && (<div className="errorMessage">{errorMessagePass}</div>)}
                    </div>

                    <div className="submitWrapper">
                        <button type="submit">Register</button>
                        <button type="reset" onClick={removeErrorMessages}>X</button>
                    </div>
                </div>
            </form>
        </div>
    )
}