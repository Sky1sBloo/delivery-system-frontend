<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { getUserInfo } from "$lib/user.js";

    onMount(async () => {
        try {
            const account = await getUserInfo((res) => {
                if (res.status === 401) {
                    goto("/login");
                }
            });
            if (account.accountType === "management") {
                goto("/management/dashboard");
            } else {
                goto("/delivery/dashboard");
            }
        } catch (err) {
            console.error("Error checking user auth:", err);
            goto("/login");
        }
    });
</script>

<p>Loading</p>
