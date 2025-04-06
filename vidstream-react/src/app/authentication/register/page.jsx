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

function createRandomHash() {
    const characters = 'ABCDEFGHIJKLMOPRSTUVWXYZabcdefghijklmoprstuvwxyz0123456789!@$^*()_-';
    const minLength = 200;
    const maxLength = 254;
    const hashLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let url_hash = '';
    
    for (let i = 0; i < hashLength; i++) {
        url_hash += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    if (url_hash.length > 0) {
        return url_hash;
    }
}

export default function register() {
    
    const inputNameRef = useRef();
    const inputMailRef = useRef();
    const inputPassRef = useRef();

    const [errorNameState, setErrorNameState] = useState(false);
    const [errorMailState, setErrorMailState] = useState(false);

    const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.

    const [createdUserStatus, setCreatedUserStatus] = useState();

    var errorMessageName = "Name already exists.";
    var errorMessageMail = "Email already exists.";

    useEffect(() => { // changus the status by function dbStatus.
        async function checkDbStatus() {
            const result = await dbStatus();
            setStatus(result);
        }
        checkDbStatus();
    }, []);

    const addInfoToDb = async (e) => {
        e.preventDefault()
        removeMessages()
        
        var nameInput = inputNameRef.current.value;
        var mailInput = inputMailRef.current.value;
        var passInput = inputPassRef.current.value;
        var url_hash = createRandomHash();

        const formData = [nameInput, mailInput, passInput, url_hash];

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
                try { // post request to create user.
                    const response = await fetch('/api/login/CRUD/create', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    })
                    const data = await response.json();
                    setCreatedUserStatus(true)

                } catch (error) {
                    console.error(error);
                }
            }

        }
        // Updating the state once, after checking all users
        setErrorNameState(nameError);
        setErrorMailState(mailError);
    }

    const removeMessages = () => { // sets the errormessages to false.
        if (errorNameState) {
            setErrorMailState(false)
        }

        if (errorMailState) {
            setErrorMailState(false)
        }

        if (createdUserStatus) {
            setCreatedUserStatus(false)
        }
    }

    return (
        <div id="Empty">
            <form className="registerForm" onSubmit={(e) => addInfoToDb(e)}>
                {!status && (
                    <div className="offlineDbWrapper">
                        <div className="offlineDbText">
                            This page is NOT receiving data at the moment.
                        </div>
                    </div>
                )}
                <div className="formInnerWrapper">
                    <div className="textWrapper">
                        <div className="resetMainTitle">Register</div>
                    </div>
                    <div className="inputWraper">
                        <div className="inputTitle">Username</div>
                        <input type="text" name="name" placeholder="Name" ref={inputNameRef}
                            className={`${errorNameState ? 'errorMessage errorBorder' : ''}`}
                            required
                            minLength={4}
                            maxLength={25} />
                        {errorNameState && (<div className="errorMessage">{errorMessageName}</div>)}
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Email</div>
                        <input type="email" name="email" placeholder="Email" ref={inputMailRef} 
                        className={`${errorMailState ? 'errorMessage errorBorder' : ''}`} 
                        required 
                        pattern="^[^@]+@[^@]+$" 
                        minLength={6} 
                        maxLength={50} />
                        {errorMailState && (<div className="errorMessage">{errorMessageMail}</div>)}
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Password</div>
                        <input type="password" name="password" placeholder="Password" ref={inputPassRef}
                            required
                            minLength={6}
                            maxLength={15}
                            pattern=".*[\d\W].*" // .* Allows any characters before or after the required part. \d → A digit. \W → A non-word character. .* → Allows any characters before or after the match.
                            title="Password must be 6-15 characters long & include at least 1 number or special character (@, #, $)." />
                    </div>

                    <div className="outerSubmitWrapper">
                        {createdUserStatus && (
                            <div className="createdAcc">Account succesfully created!</div>
                        )}
                        <div className="submitWrapper">
                            <button type="submit">Register</button>
                            <button type="reset" onClick={removeMessages}>X</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}