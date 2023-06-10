<script>
    import Header from "../components/header.svelte";
    import Bridge from "../components/bridge.svelte";

    let ws;
</script>

<Header />
<Bridge />

<style>
    :global(body) {
        margin: 20px;
        padding: 0;
        background-image: url("/space.jpg");
        background-size: cover;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
