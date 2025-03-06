"use client"
import "../../css/formStyles.css"

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

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

import "../../css/formStyles.css"

export default function editForm() {
    const inputPassRef = useRef();
    const inputPassConfirmRef = useRef();

    const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.

    const [errorPassConfirmState, setErrorPassConfirmState] = useState()

    var errorMessagePassConfirm = "Passwords do not match!";

    useEffect(() => { // changus the status by function dbStatus.
        async function checkDbStatus() {
            const result = await dbStatus();
            setStatus(result);
        }
        checkDbStatus();
    }, []);

    const updatePass = (e) => {
        e.preventDefault()

        var passInput = inputPassRef.current.value;
        var passConfirmInput = inputPassConfirmRef.current.value;

        if (passInput === passConfirmInput) { // checks if both passwords match.
            removeErrorMessage();
            console.log("sme")
            
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
                        <div className="resetText">Enter a new password for </div>
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