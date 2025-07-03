<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(async () => {
        await fetch("/api/user/logout");
        goto("/login");
    });
</script>

<p>Logging out</p>
