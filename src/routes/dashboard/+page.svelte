<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(async () => {
        try {
            const res = await fetch("/api/user/", {
                method: "GET",
                credentials: "include",
            });

            if (res.status === 401) {
                goto("/login");
            }
            const data = await res.json();
            if (data.accountType === "management") {
                goto("/management/dashboard");
            }
        } catch (err) {
            console.error("Error checking user auth:", err);
            goto("/login");
        }
    });
</script>

<p>Loading</p>
