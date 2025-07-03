<script>
    import Navbar from "$lib/navbarDelivery.svelte";
    import Footer from "$lib/footer.svelte";
    import { onMount } from "svelte";

    onMount(async () => {
        try {
            const account = await getUserInfo((res) => {
                if (res.status === 401) {
                    goto("/login");
                }
            });

            if (account.accountType !== "management") {
                goto("/");
            }
        } catch (error) {
            console.error(error);
        }
    });
</script>

<!-- Header -->
<Navbar currentPath="/dashboard" />

<div class="Dashboard">
    <div class="main">
        <div class="grid-wrapper">
            <div class="grid">
                <div class="card">
                    <img src="/shipment.png" alt="View Assigned Shipment" />
                    <a href="/delivery/assigned" class="card-link">Assigned Shipment</a>
                </div>
                <div class="card">
                    <img src="/history.png" alt="Shipping History" />
                    <a href="/shipping-history" class="card-link">Get Route</a>
                </div>
                <div class="card">
                    <img src="/contactUs.png" alt="Contact Us" />
                    <a href="ContactUs.html" class="card-link">Contact Us</a>
                </div>
            </div>
        </div>

        <div class="image-box">
            <img src="/delivery.png" alt="Delivery van and worker" />
        </div>
    </div>

    <Footer />
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .Dashboard {
        height: 100%;
    }

    /*header*/
    .Dashboard {
        font-family: "Roboto", sans-serif;
        background-image: url("/mainbg.jpeg");
        color: #004040;
        display: flex;
        flex-direction: column;
    }

    .main {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 2rem 4rem;
        gap: 3rem;
        justify-content: space-between;
        align-items: center;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
        place-items: center;
    }

    .card {
        background-color: #aad6d6;
        width: 250px;
        height: 250px;
        padding: 1.5rem;
        border-radius: 30px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .card-link {
        color: #004c4c;
        font-weight: bold;
        font-size: 1.8rem;
        text-decoration: none;
        transition:
            color 0.3s,
            text-decoration 0.3s;
    }

    .card-link:hover {
        color: #002f2f;
        text-decoration: underline;
        cursor: pointer;
    }

    .grid .card:nth-child(3) {
        grid-column: span 2;
        justify-self: center;
    }

    .grid-wrapper {
        margin-left: 150px;
    }

    .card img {
        width: 120px;
        height: 120px;
        margin-bottom: 1rem;
        object-fit: contain;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    .image-box {
        flex: 1;
        max-width: 600px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .image-box img {
        width: 900%;
        max-width: 1000px;
        height: auto;
        border-radius: 50px;
        margin-top: 5px;
        object-fit: cover;
        border: 5px solid #d9d9d9;
    }
</style>
