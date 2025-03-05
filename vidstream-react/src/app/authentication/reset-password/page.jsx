"use client"
import { useRef, useState, useEffect } from "react";

import { redirect } from 'next/navigation'

import "../../css/formStyles.css";

import { pushToSearch } from "../../standard/searchfunctions/pushToEdit"

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


export default function resetForm() {
    const inputMailRef = useRef(); // creating refs to get the input values from the form.

    const [errorMailState, setErrorMailState] = useState(false);
    const [redirectingMailState, setRedirectingMailState] = useState(false)

    const [status, setStatus] = useState(true); // true because if db is active, the error message doesnt display for a split second.

    var errorMessageMail = "Email not found.";

    useEffect(() => {
        async function checkDbStatus() {
            const result = await dbStatus();
            // console.log("db status = ", result)
            setStatus(result);
        }
        checkDbStatus();
    }, []);

    const checkMail = async (e) => {
        e.preventDefault()

        handleSubmit(e)

        var mailInput = inputMailRef.current.value;

        var data = await fetchUsers()
        if (data) { // checks if data from Db is existing.
            var foundUser = false;
            var userID;
            for (var i = 0; i < data.users.length; i++) { // reads over every item in the Db.
                if (data.users[i].email === mailInput) { // checks if input values are the same in the Db.
                    setErrorMailState(false);
                    setRedirectingMailState(true);
                    foundUser = true;
                    userID = data.users[i].id;
                    break;
                }
                setErrorMailState(!foundUser);
            }
        }

        if (errorMailState !== null && mailInput && foundUser) {
            // console.log(errorMailState)
            if (errorMailState) {
                console.log("noredirect");
            } else {
                console.log("redirect");
                redirect(`/authentication/edit-${userID}`)
            }
        }
    }

    const removeErrorMessage = () => { // sets the errormessages to false.
        if (errorMailState) {
            setErrorMailState(false)
        }
    }

    const { handleSubmit, handleChange } = pushToSearch()

    return (
        <div id="Empty">
            <form className="resetForm" onSubmit={(e) => checkMail(e)}>
                {!status && (
                    <div className="offlineDbWrapper">
                        <div className="offlineDbText">
                            This page is NOT receiving data at the moment
                        </div>
                    </div>
                )}
                <div className="formInnerWrapper">
                    <div className="textWrapper">
                        <div className="resetMainTitle">Password Reset</div>
                        <div className="resetText">Provide the email adress with your account to recover your passoword.</div>
                    </div>
                    <div className="inputWraper">
                        <div className="inputTitle">Email</div>

                        <input type="email" 
                        name="email" 
                        placeholder="user@gmail.com" 
                        ref={inputMailRef} 
                        className={`${errorMailState ? 'errorMessage errorBorder' : ''}`} 
                        onInput={handleChange}
                        required />
                        
                        {errorMailState && (<div className="errorMessage">{errorMessageMail}</div>)}
                        {redirectingMailState && (<div className="createdAcc">Email found! Redirecting...</div>)}
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