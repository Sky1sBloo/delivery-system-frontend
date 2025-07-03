<script>
    export let selectedCity = "";
    import { cities } from "./cities.js";
</script>

<select id="city-select" bind:value={selectedCity}>
    <option value="" disabled selected>Select a city</option>
    {#each cities as city, index}
        {#if city !== null}
            <option value={index}>{city}</option>
        {/if}
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
