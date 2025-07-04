<script>
    import { onMount } from "svelte";
    import Navbar from "$lib/navbar.svelte";
    import Footer from "$lib/footer.svelte";

    import { cities } from "$lib/cities.js";
    import { goto } from "$app/navigation";

    let shipments = [];

    onMount(async () => {
        try {
            await loadShipments();
        } catch (error) {
            console.error(error);
        }
    });

    const loadShipments = async () => {
            const res = await fetch("/api/delivery/all");
            if (res.ok) {
                shipments = await res.json();
            } else {
                throw new Error("Failed to fetch shipments");
            }
    }

    const editShipment = (shipment) => {
        goto(`/shipment/edit/${shipment.id}`);
    };

    const deleteShipment = async (shipment) => {
        try {
            const res = await fetch(`/api/delivery/${shipment.id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Failed to delete shipment");
            }

            await loadShipments();
        } catch (error) {
            console.error(error);
        }
    };
</script>

<div class="shipping-history">
    <Navbar currentPath="/shipping-history" />
    <div class="content-container">
        <h2>Shipping History</h2>
        <section class="scrollable-table">
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Edit</th>
                        <th>Product Name</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>Sender</th>
                        <th>Recipient</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Date Shipped</th>
                        <th>Deadline</th>
                        <th>Weight (kg)</th>
                        <th>Volume (m3)</th>
                    </tr>
                </thead>
                <tbody>
                    {#each shipments as shipment}
                        <tr>
                            <td>
                                <button on:click={() => editShipment(shipment)}
                                    >Edit</button
                                >
                                <button
                                    on:click={() => deleteShipment(shipment)}
                                    >Delete</button
                                >
                            </td>
                            <td>{shipment.product_name}</td>
                            <td>{shipment.assigned_delivery}</td>
                            <td>{shipment.status}</td>
                            <td>{shipment.sender}</td>
                            <td>{shipment.recipient}</td>
                            <td>{cities[shipment.source]}</td>
                            <td>{cities[shipment.destination]}</td>
                            <td>{shipment.date_shipped}</td>
                            <td>{shipment.deadline}</td>
                            <td>{shipment.weight}</td>
                            <td>{shipment.volume}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </section>
    </div>

    <Footer />
</div>

<style>
    /* === RESET AND LAYOUT === */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .shipping-history {
        height: 100%;
        font-family: Arial, sans-serif;
        background-image: url("/mainbg.jpeg");
        background-size: cover;
        background-repeat: repeat;
        display: flex;
        flex-direction: column;
        color: white;
    }

    /* === MAIN CONTENT === */
    .content-container {
        background-color: #e1ffff;
        margin: 40px auto;
        padding: 20px;
        width: 90%;
        max-width: 1200px;
        border-radius: 20px;
        color: black;
        flex: 1; /* take up remaining space */
        text-align: center;
    }

    .content-container h2 {
        color: black;
        font-weight: bold;
        margin-bottom: 20px;
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
