<script>
    export let selectedCity = "";

    const cities = [
        "Tuguegarao",
        "Ilagan",
        "Cauayan",
        "Santiago",
        "Baguio",
        "San Fernando",
        "Dagupan",
        "Urdaneta",
        "Tarlac",
        "Angeles",
        "Caloocan",
        "Cabanatuan",
        "Quezon",
        "Marikina",
        "Antipolo",
        "Olongapo",
        "Bulacan",
        "Laguna",
        "Manila",
        "Makati",
        "Pasig",
        "Pasay",
        "Taguig",
        "Parañaque",
        "Muntinlupa",
        "Cavite City",
        "Imus",
        "Dasmariñas",
        "Bacoor",
        "Batangas City",
        "Lipa",
        "Tanauan",
        "Lucena",
        "Tayabas",
        "Santa Rosa",
        "Biñan",
        "San Pablo",
        "San Jose del Monte",
        "Malolos",
        "Meycauayan",
        "Balanga",
        "Subic",
        "Santa Cruz (Laguna)",
        "Rizal",
        "Alaminos (Pangasinan)",
        "San Carlos (Pangasinan)",
        "Laoag (Ilocos Norte)",
        "Vigan (Ilocos Sur)",
        "Aparri (Cagayan)",
        "Bayombong (Nueva Vizcaya)",
    ];
</script>

<select id="city-select" bind:value={selectedCity}>
    <option value="" disabled selected>Select a city</option>
    {#each cities as city, index}
        <option value={index}>{city}</option>
    {/each}
</select>

<style>
    select {
        padding: 12px;
        border: none;
        border-radius: 25px;
        outline: none;
        font-size: 14px;
        width: 100%;
    }
</style>
