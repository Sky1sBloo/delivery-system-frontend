<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import City from "$lib/city.svelte";

    let productName;
    let deliverySelected;
    let senderName;
    let source;
    let receiverName;
    let destination;
    let dateShipped;
    let deadline;
    let packageWeight;

    let delivery = [];

    onMount(async () => {
        try {
            const res = await fetch("http://localhost:3000/api/user/delivery", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            delivery = data;
        } catch (error) {
            console.error(error.message);
        }
    });

    const submitNewData = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/delivery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_name: productName,
                    assigned_delivery: deliverySelected,
                    sender: senderName,
                    recipient: receiverName,
                    destination: destination,
                    source: source,
                    date_shipped: dateShipped,
                    deadline: deadline,
                    weight: packageWeight 
                }),
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Submit failed");
            }
            goto("/dashboard");
        } catch (error) {
            console.error(error.message);
        }
    };
</script>

<div class="shipment">
    <header class="navbar">
        <div class="logo">deliver<span class="highlight">ithm</span></div>
        <nav class="nav-links">
            <a href="/dashboard">Dashboard</a>
            <a href="/" class="active">Create Shipment</a>
            <a href="/">Shipping History</a>
            <a href="/">Contact Us</a>
        </nav>
    </header>

    <main class="shipment-container">
        <div class="shipment-card">
            <button on:click={goto("/")}>
                <img
                    src="/arrow-left-circle.png"
                    alt="Back Button"
                    class="back-button"
                />
            </button>
            <h2>Shipment Information</h2>
            <form class="shipment-form" on:submit={submitNewData}>
                <div class="form-row">
                    <div class="form-group">
                        <label for="text">Product Name</label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            bind:value={productName}
                        />
                    </div>
                    <div class="form-group">
                        <label for="item-select"> Delivery Person</label>
                        <select bind:value={deliverySelected}>
                            <option value="" disabled selected>
                                Select One
                            </option>
                            {#each delivery as employee}
                                <option value={employee.username}
                                    >{employee.username}</option
                                >
                            {/each}
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="text">Sender Name</label>
                        <input
                            type="text"
                            placeholder="Sender Name"
                            bind:value={senderName}
                        />
                    </div>
                    <div class="form-group">
                        <label for="item-select">Source </label>
                        <City bind:selectedCity={source} />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="text">Receiver Name</label>
                        <input
                            type="text"
                            placeholder="Receiver Name"
                            bind:value={receiverName}
                        />
                    </div>
                    <div class="form-group">
                        <label for="item-select">Destination</label>
                        <City bind:selectedCity={destination} />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="date">Date Shipped</label>
                        <input type="date" bind:value={dateShipped} />
                    </div>
                    <div class="form-group">
                        <label for="date">Deadline</label>
                        <input type="date" bind:value={deadline} />
                    </div>
                </div>

                <div class="form-row weight-dimension-row">
                    <div class="form-group package-weight-group">
                        <label for="number">Package Weight</label>
                        <input
                            type="number"
                            placeholder="Weight (kg)"
                            bind:value={packageWeight}
                        />
                    </div>
                </div>

                <div class="form-actions">
                    <input type="submit" class="proceed-btn" value="Proceed"/>
                </div>
            </form>
        </div>
    </main>

    <!--confirmation-->
    <div id="confirmation-modal" class="modal hidden">
        <div class="modal-content">
            <p>Are you sure you want to proceed?</p>
            <div class="modal-buttons">
                <button id="yes-btn">Yes</button>
                <button id="no-btn">No</button>
            </div>
        </div>
    </div>

    <!--footer-->
    <footer class="footer">Precision Routing, Perfect Timing.</footer>
</div>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .shipment {
        height: 100%;
    }

    /*header*/
    .shipment {
        background-color: #004c4c;
        color: #000;
        font-family: "Roboto", sans-serif;
        display: flex;
        flex-direction: column;
        background-image: url("mainbg.jpeg");
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0099a0;
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

    .shipment-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        flex: 1;
    }

    .shipment-card {
        background-color: #a6c9c9;
        padding: 40px;
        border-radius: 20px;
        width: 100%;
        max-width: 800px;
        position: relative;
    }

    .back-button {
        width: 40px;
        height: 40px;
        cursor: pointer;
        position: absolute;
        top: 20px;
        left: 20px;
    }

    .back-button:hover {
        opacity: 0.7;
    }

    .shipment-card h2 {
        text-align: center;
        margin-bottom: 30px;
        font-size: 26px;
        font-weight: 700;
    }

    .shipment-form .form-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }

    .shipment-form .form-group {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 200px;
        margin-right: 20px;
    }

    .shipment-form label {
        margin-bottom: 6px;
        font-weight: 600;
        font-size: 14px;
    }

    .shipment-form input,
    .shipment-form select {
        padding: 12px;
        border: none;
        border-radius: 25px;
        outline: none;
        font-size: 14px;
        width: 100%;
    }

    .package-weight-group input {
        width: calc((100% - 20px) / 3);
    }

    .weight-dimension-row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .weight-dimension-row > .form-group {
        flex: 1;
        min-width: calc((100% - 20px) / 3);
    }

    .form-actions {
        text-align: right;
        margin-top: 30px;
    }

    .proceed-btn {
        background-color: #006d66;
        color: #ffffff;
        font-weight: bold;
        padding: 12px 25px;
        border: none;
        border-radius: 30px;
        cursor: pointer;
        font-size: 18px;
        border: 5px solid #004c4c;
        transition: background-color 0.3s;
    }

    .proceed-btn:hover {
        background-color: #004c4c;
    }

    /*footer*/
    .footer {
        background-color: #00a7a7;
        text-align: left;
        padding: 1rem 2rem;
        font-family: "Great Vibes", cursive;
        font-weight: 600;
        font-size: 2.5rem;
        border-top: 4px dashed #000000;
        margin-top: auto;
    }

    /* yes or no */
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }

    .modal.hidden {
        display: none;
    }

    .modal-content {
        background-color: #ffffff;
        padding: 30px 40px;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }

    .modal-content p {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 20px;
        color: #004c4c;
    }

    .modal-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .modal-buttons button {
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    #yes-btn {
        background-color: #004c4c;
        color: white;
    }

    #yes-btn:hover {
        background-color: #003333;
    }

    #no-btn {
        background-color: #cccccc;
        color: #333;
    }

    #no-btn:hover {
        background-color: #aaaaaa;
    }
</style>
