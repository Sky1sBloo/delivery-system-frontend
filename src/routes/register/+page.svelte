<script>
    import { goto } from "$app/navigation";
    let username = "";
    let password = "";
    let accountType = ""; // management/delivery

    const login = async (e) => {
        e.preventDefault(); // stop page reload

        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();
            console.log(data);
            goto("/");
        } catch (err) {
            console.error("Login error:", err);
        }
    };
</script>

<div class="container">
    <div class="left-panel">
        <img src="/truck.png" alt="Deliverithm Truck" class="truck-image" />
        <p class="tagline">Precision Routing, Perfect Timing.</p>
    </div>
    <div class="right-panel">
        <form class="login-box" on:submit={login}>
            <img
                src="/truckLogo.png"
                alt="Deliverithm Logo"
                class="logo-icon"
            />
            <input
                bind:value={username}
                type="text"
                placeholder="Username"
                class="input-field"
            />
            <input
                bind:value={password}
                type="password"
                placeholder="Password"
                class="input-field"
            />
            <select bind:value={accountType} class="input-field">
                <option value="management">Management</option>
                <option value="delivery">Delivery</option>
            </select>
            <input class="login-btn" type="submit" value="Register " />
            <div class="links">
                <a href="/login">Existing Account?</a>
            </div>
        </form>
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        display: flex;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }

    .left-panel {
        width: 60%;
        background-color: #00a6a6;
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        padding: 0;
        overflow: visible;
    }

    .truck-image {
        position: absolute;
        top: -50px;
        right: -300px;
        width: 1800px;
        height: auto;
        z-index: 5;
        pointer-events: none;
    }

    .tagline {
        position: absolute;
        bottom: 2rem;
        left: 2rem;
        transform: translate(60%, -50%);
        font-family: "Great Vibes", cursive;
        font-size: 2.5rem;
        font-weight: 1000;
        color: #004c4c;
        text-align: center;
        z-index: 10;
    }

    .right-panel {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("mainbg.jpeg");
        background-repeat: repeat;
        position: relative;
        z-index: 1;
    }

    .login-box {
        background-color: rgba(255, 255, 255, 0.5);
        padding: 2.5rem 2rem;
        border-radius: 40px;
        width: 50%;
        height: 65%;
        max-width: 400px;
        min-height: 420px;
        text-align: center;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 10;
        line-height: 1.5;
    }

    .logo-icon {
        width: 160px;
        margin-top: -10px;
        margin-bottom: 10px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .input-field {
        display: block;
        width: 100%;
        padding: 0.75rem;
        margin: 10px 0;
        border: none;
        border-radius: 30px;
        font-size: 1rem;
        line-height: 1.8;
        margin-bottom: 5%;
    }

    .login-btn {
        width: 100%;
        padding: 0.75rem;
        background-color: #004c4c;
        color: white;
        border: none;
        border-radius: 30px;
        font-size: 1.1rem;
        font-weight: bold;
        margin: 1rem 0;
        cursor: pointer;
        transition: 0.3s;
        margin-bottom: 40%;
        margin-top: 10%;
        line-height: 1.8;
    }

    .login-btn:hover {
        background-color: #003333;
    }

    .links {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 0.9rem;
    }

    .links a {
        color: #004d4d;
        text-decoration: none;
    }

    .links a:hover {
        text-decoration: underline;
    }
</style>
