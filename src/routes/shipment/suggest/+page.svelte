<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { cities } from "$lib/cities.js";
    import City from "$lib/city.svelte";
    import Navbar from "$lib/navbarDelivery.svelte";

    let source;
    let destination;
    let capacity;
    let shipments = [];

    let delivery = [];
    onMount(async () => {
        try {
            const res = await fetch("/api/user/delivery", {
                method: "GET",
                credentials: "include",
            });
            const data = await res.json();
            delivery = data;
        } catch (error) {
            console.error(error.message);
        }
    });

    const suggestItems = async (e) => {
        e.preventDefault();

        try {
            const params = new URLSearchParams({
                source: source,
                destination: destination,
                capacity: capacity,
            });
            if (source === "" || destination === "") {
                return;
            }
            let res = await fetch(`/api/delivery/items?${params.toString()}`);
            if (!res.ok) {
                throw new Error("Failed to fetch route");
            }
            const ids = await res.json();
            if (ids === "No items selected") {
                return;
            }

            for (const id of ids) {
                res = await fetch(`/api/delivery/${id}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch route");
                }
                const shipment = await res.json();
                shipments = [...shipments, shipment];
                console.log(shipments);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const assignEmployee = async (e) => {
        const deliverySelected = e.target.value;

        const res = await fetch(`/api/delivery/${e.target.dataset.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                assigned_delivery: deliverySelected,
            }),
            credentials: "include",
        });
    };
</script>

<div class="shipment">
    <Navbar currentPath="/route" />

    <main class="shipment-container">
        <div class="shipment-card">
            <button on:click={goto("/")}>
                <img
                    src="/arrow-left-circle.png"
                    alt="Back Button"
                    class="back-button"
                />
            </button>
            <h2>Suggest Items</h2>
            <form class="shipment-form" on:submit={suggestItems}>
                <div class="form-row">
                    <div class="form-group">
                        <label for="item-select">Source </label>
                        <City bind:selectedCity={source} />
                    </div>
                    <div class="form-group">
                        <label for="item-select">Destination</label>
                        <City bind:selectedCity={destination} />
                    </div>
                    <div class="form-group">
                        <label for="number">Capacity</label>
                        <input type="number" bind:value={capacity} />
                    </div>
                </div>
                <div class="form-actions">
                    <input type="submit" class="proceed-btn" value="Proceed" />
                </div>
            </form>
            <section class="scrollable-table">
                <table class="history-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Assigned</th>
                            <th>Status</th>
                            <th>Sender</th>
                            <th>Recipient</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Date Shipped</th>
                            <th>Deadline</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each shipments as shipment}
                            <tr>
                                <td>{shipment.id}</td>
                                <td>{shipment.product_name}</td>
                                <td>
                                    <select on:change={assignEmployee} data-id={shipment.id}> 
                                        {#each delivery as employee}
                                            <option value={employee.username}
                                                >{employee.username}</option
                                            >
                                        {/each}
                                    </select>
                                </td>
                                <td>{shipment.status}</td>
                                <td>{shipment.sender}</td>
                                <td>{shipment.recipient}</td>
                                <td>{cities[shipment.source]}</td>
                                <td>{cities[shipment.destination]}</td>
                                <td>{shipment.date_shipped}</td>
                                <td>{shipment.deadline}</td>
                                <td>{shipment.weight}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </section>
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
        max-width: 1200px;
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

    .shipment-form input {
        padding: 12px;
        border: none;
        border-radius: 25px;
        outline: none;
        font-size: 14px;
        width: 100%;
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

    /* === TABLE === */
    .scrollable-table {
        max-height: 400px;
        overflow-y: auto;
        border: 2px solid #00a6a6;
    }
    .history-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
        color: black;
    }

    .history-table th,
    .history-table td {
        border: 2px solid #00a6a6;
        padding: 12px;
        text-align: left;
    }

    .history-table thead th {
        position: sticky;
        top: 0;
        background-color: #e1ffff;
        z-index: 1;
    }
</style>
