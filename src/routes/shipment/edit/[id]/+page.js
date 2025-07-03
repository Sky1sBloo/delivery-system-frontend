export async function load({ fetch, params }) {
    const res = await fetch(`/api/delivery/${params.id}`, {
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch delivery info: ${res.status}`);
    }

    const deliveryInfo = await res.json();
    return { deliveryInfo };
}
