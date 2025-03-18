"use client"
import "../../css/formStyles.css"

import { useRef, useState, useEffect } from "react";

import { redirect, useSearchParams } from 'next/navigation';

async function fetchUsers() {
    try {
        const response = await fetch('../../api/login/CRUD/read-create'); // Fetch to SQL.
        const data = await response.json(); // Convert response to JSON.

        return data;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function dbStatus() {
    var data = await fetchUsers();
    var status = false;
    if (data) { // data.users does not exist when there is an error from the Db.
        status = true;
    } else {
        status = false;
    }
    return status;
}

export default function editForm() {
    const urlHash = useSearchParams().get("q");

    const [userID, setUserID] = useState(null);
    const [userName, setUserName] = useState(null);

    const inputPassRef = useRef();
    const inputPassConfirmRef = useRef();
    const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.
    const [errorPassConfirmState, setErrorPassConfirmState] = useState();

    var errorMessagePassConfirm = "Passwords do not match!";

    useEffect(() => {
        if (!urlHash) return; // Prevent running if no query param

        const fetchMail = async() => {
            var userID;
            var userName;
            const data = await fetchUsers();
            for (let i = 0; i < data.users.length; i++) {                
                if (data.users[i].url_hash === urlHash) {
                    userID = data.users[i].id;
                    userName = data.users[i].name;
                } else {
                    redirect('/not-found')
                }
            }            
            if (userName) setUserName(userName);
            if (userID) setUserID(userID);
        }

        fetchMail();
    }, [urlHash]);

    useEffect(() => { // changus the status by function dbStatus.
        async function checkDbStatus() {
            const result = await dbStatus();
            setStatus(result);
        }
        checkDbStatus();
    }, []);

    const updatePass = async (e) => {
        e.preventDefault()

        const passInput = inputPassRef.current.value;
        const passConfirmInput = inputPassConfirmRef.current.value;

        const formData = [userID, passConfirmInput]
        
        console.log(formData);
        
        if (passInput === passConfirmInput) { // checks if both passwords match.
            removeErrorMessage();

            try { // post request to create user.
                const response = await fetch('/api/login/CRUD/read-create', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                const data = await response.json();
                // setCreatedUserStatus(true)

            } catch (error) {
                console.error(error);
            }
        } else {
            setErrorPassConfirmState(true)
        }
    }

    const removeErrorMessage = () => {
        if (errorPassConfirmState) {
            setErrorPassConfirmState(false)
        }
    }


    return (
        <div id="Empty">
            <form className="editPassword" onSubmit={(e) => updatePass(e)}>
                {!status && (
                    <div className="offlineDbWrapper">
                        <div className="offlineDbText">
                            This page is NOT receiving data at the moment.
                        </div>
                    </div>
                )}
                <div className="formInnerWrapper">
                    <div className="textWrapper">
                        <div className="resetMainTitle">Reset account password</div>
                        <div className="resetText">Enter a new password for: <div className="userName">{userName}</div></div>
                    </div>
                    <div className="inputWraper">
                        <div className="inputTitle">Password</div>
                        <input type="password" name="password" placeholder="Password" ref={inputPassRef}
                            className={`${errorPassConfirmState ? 'errorMessage errorBorder' : ''}`}
                            required
                            minLength={6}
                            maxLength={15}
                            pattern=".*[\d\W].*" // .* Allows any characters before or after the required part. \d → A digit. \W → A non-word character. .* → Allows any characters before or after the match.
                            title="Password must be 6-15 characters long & include at least 1 number or special character (@, #, $)."
                        />
                    </div>
                    <div className="inputWraper">
                        <div className="inputTitle">Confirm Password</div>
                        <input type="password" name="password" placeholder="Password" ref={inputPassConfirmRef} className={`${errorPassConfirmState ? 'errorMessage errorBorder' : ''}`} required />
                        {errorPassConfirmState && (<div className="errorMessage">{errorMessagePassConfirm}</div>)}
                    </div>

                    <div className="outerSubmitWrapper">
                        <div className="submitWrapper">
                            <button type="submit">Reset password</button>
                            <button type="reset" onClick={removeErrorMessage}>X</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}