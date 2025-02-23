"use client"
import "../../css/formStyles.css"

import { useRef } from "react";

export default function register() {
    const inputNameRef = useRef();
    const inputMailRef = useRef();
    const inputPassRef = useRef();

    
    const addInfoToDb = (e) => {
        e.preventDefault()
        
        var nameInput = inputNameRef.current.value;
        var mailInput = inputMailRef.current.value;
        var passInput = inputPassRef.current.value;

        // console.log([nameInput, mailInput, passInput])

        console.log([nameInput, mailInput, passInput]);

        useEffect(() => {
            // PUT request using fetch with async/await
            async function updatePost() {
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: 'React Hooks PUT Request Example' })
                };
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions);
                const data = await response.json();
                setPostId(data.id);
            }
        
            updatePost();
        }, []);
    }


    return (
        <div id="Empty">
            <form className="registerForm" onSubmit={(e) => addInfoToDb(e)}>
                <div className="formInnerWrapper">

                    <div className="inputWraper">
                        <div className="inputTitle">Username</div>
                        <input type="text" name="name" placeholder="Name" ref={inputNameRef} required />
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Email</div>
                        <input type="email" name="email" placeholder="Email" ref={inputMailRef} required />
                    </div>

                    <div className="inputWraper">
                        <div className="inputTitle">Password</div>
                        <input type="password" name="password" placeholder="Password" ref={inputPassRef} required />
                    </div>

                    <div className="submitWrapper">
                        <button type="submit">Register</button>
                        <button type="reset">X</button>
                    </div>
                </div>
            </form>
        </div>
    )
}