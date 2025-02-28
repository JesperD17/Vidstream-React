"use client"
import "../../css/formStyles.css"

import { useRef, useState, useEffect } from "react";

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
    if (data.users) { // data.users does not exist when there is an error from the Db.
        status = true;
    } else {
        status = false;
    }
    return status;
}

export default function register() {
    const inputNameRef = useRef();
    const inputMailRef = useRef();
    const inputPassRef = useRef();

    const [errorNameState, setErrorNameState] = useState(false);
    const [errorMailState, setErrorMailState] = useState(false);
    const [errorPassState, setErrorPassState] = useState(false);

    const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.

    var errorMessageName = "Name already exists.";
    var errorMessageMail = "Email already exists.";
    var errorMessagePass = "Password already exists.";

    useEffect(() => {
        async function checkDbStatus() {
            const result = await dbStatus();
            // console.log("db status = ", result)
            setStatus(result);
        }
        checkDbStatus();
    }, []);

    const addInfoToDb = async (e) => {
        e.preventDefault()

        var nameInput = inputNameRef.current.value;
        var mailInput = inputMailRef.current.value;
        var passInput = inputPassRef.current.value;

        const formData = [nameInput, mailInput, passInput];

        let nameError = false;
        let mailError = false;

        var data = await fetchUsers();
        if (data) { // checks if data from Db is existing.
            for (var i = 0; i < data.users.length; i++) {
                if (data.users[i].name === nameInput) { // checks if input values are the same in the Db.
                    nameError = true;
                }

                if (data.users[i].email === mailInput) {
                    mailError = true;
                }
            }

            if (nameError === false && mailError === false) { // if the name and mail is not existing.
                console.log(nameError, mailError)
                try { // post request to create user.
                    const response = await fetch('/api/login/CRUD/read-create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    const data = await response.json();

                    // (usefull code for the future)
                    // if (!response.ok) { // if name, mail and or password already exist, this error happens.
                    //     console.log("error");
                    // } else {
                    //     console.log("succesful creation")
                    // }

                } catch (error) {
                    console.error(error);
                }
            }

        }
        // Now update the state once, after checking all users
        setErrorNameState(nameError);
        setErrorMailState(mailError);
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
                {!status && (
                    <div className="offlineDbWrapper">
                        <div className="offlineDbText">
                            This page is NOT receiving data at the moment
                        </div>
                    </div>
                )}
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