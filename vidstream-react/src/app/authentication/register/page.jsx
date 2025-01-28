"use client"

export default function register() {
    function submitHhandler() {
        console.log("registerered")
    }
    return (
        <>
            <form onSubmit={submitHhandler}>
                <input type="email" name="email" placeholder="Email" required />

                <input type="password" name="password" placeholder="Password" required />

                <button type="submit">register</button>
            </form>
        </>
    )
}