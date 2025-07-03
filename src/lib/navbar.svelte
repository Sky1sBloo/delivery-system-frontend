<script>
    export let currentPath = "/";
</script>

<header class="navbar">
    <div class="logo">deliver<span class="highlight">ithm</span></div>
    <nav class="nav-links">
        <a href="/dashboard" class:active={currentPath === "/dashboard"}
            >Dashboard</a
        >
        <a href="/" class:active={currentPath === "/"}>Create Shipment</a>
        <a
            href="/shipping-history"
            class:active={currentPath === "/shipping-history"}
            >Shipping History</a
        >
        <a href="/shipment/suggest" class:active={currentPath === "/suggest"}
            >Suggest Items</a
        >
        <a href="/contactus" class:active={currentPath === "/contactus"}
            >Contact Us</a
        >
        <a href="/logout" class:active={currentPath === "/logout"}>Logout</a>
    </nav>
</header>

<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #00a6a6;
        padding: 15px 30px;
    }

    .logo {
        color: #004c4c;
        font-weight: bold;
        font-size: 3rem;
    }

    .logo .highlight {
        color: #ffffff;
        font-weight: 700;
    }

    .nav-links a {
        color: #ffffff;
        text-decoration: none;
        margin-left: 20px;
        font-weight: bold;
        padding: 8px 15px;
        border-radius: 25px;
        font-size: 1.5rem;
        transition: background-color 0.3s;
    }

    .nav-links a.active,
    .nav-links a:hover {
        background-color: #003d3d;
    }
</style>
