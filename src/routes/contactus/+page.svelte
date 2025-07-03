<script>
    import Navbar from "$lib/navbar.svelte";
</script>

<div class="page">
    <Navbar currentPath="/contactus"/>
    <main class="main-content">
        <section class="grid-wrapper">
            <h2 class="contact-heading">CONTACT US!</h2>

            <div class="grid">
                <div class="card">
                    <img src="/Mail_white.png" alt="Email" />
                    <span>Email Address</span>
                    <p>
                        <i class="fas fa-envelope"></i> deliverithmmnl@gmail.com
                    </p>
                </div>
                <div class="card">
                    <img src="/Phone_white.png" alt="Telephone" />
                    <span>Telephone</span>
                    <p><i class="fas fa-phone"></i> 1234 - 5678</p>
                </div>
                <div class="card">
                    <img src="/WhatsApp_white.png" alt="Phone Number" />
                    <span>Phone Number</span>
                    <p><i class="fas fa-mobile-alt"></i> 09123456789</p>
                </div>
                <div class="card">
                    <img src="/World_white.png" alt="Address" />
                    <span>Address</span>
                    <p>
                        <i class="fas fa-map-marker-alt"></i> 205 Sta. Rosa, Manila,
                        Philippines
                    </p>
                </div>
                <div class="card">
                    <img src="/Facebook_white.png" alt="Facebook" />
                    <span>Facebook</span>
                    <p>
                        <i class="fab fa-facebook"></i> facebook.com/Deliverithm
                    </p>
                </div>
            </div>
        </section>
    </main>

    <!-- footer -->
    <footer>
        <p>Precision Routing, Perfect Timing.</p>
    </footer>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /*background */
    .page {
        font-family: "Roboto", sans-serif;
        background-image: url("mainbg.jpeg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-attachment: fixed;
        color: #000;
    }

    .page {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    /* header */
    .main-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .grid-wrapper {
        padding: 40px 20px;
        max-width: 1400px;
        width: 100%;
        text-align: center;
    }

    .contact-heading {
        font-size: 3rem;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 40px;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        justify-items: center;
    }

    .card {
        background-color: #aad6d6;
        width: 220px;
        height: 250px;
        padding: 1.2rem;
        border-radius: 30px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        font-size: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .card img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        margin-bottom: 1rem;
    }

    /* footer */
    footer {
        background-color: #00a6a6;
        text-align: left;
        padding: 20px;
        font-family: "Great Vibes", cursive;
        font-size: 2.5rem;
        border-top: 4px dashed black;
        color: black;
    }
</style>
