<script lang="ts">
    import { Grid } from "@svelteuidev/core";
    import { Button } from "@svelteuidev/core";
    import { websocket } from "../store/store";

    let connect_status = "Connect";
    let button_style = { from: "grape", to: "pink", deg: 35 };

    function isMetaMaskInstalled(): boolean {
        return typeof window.ethereum !== "undefined";
    }

    async function connectMetaMask() {
        if (connect_status == "Connected") {
            alert("You are already connected to MetaMask.");
            return;
        }
        websocket.connect("ws://127.0.0.1:9000");
        if (!isMetaMaskInstalled()) {
            console.log("Please install MetaMask.");
            return null;
        }

        try {
            const accounts = (await window.ethereum.request({
                method: "eth_requestAccounts",
            })) as string[];
            console.log("Connected to MetaMask. Account address:", accounts[0]);
            button_style = { from: "teal", to: "green", deg: 105 };
            connect_status = "Connected";
            websocket.sendMessage(accounts[0]);
        } catch (error) {
            console.error("Failed to connect to MetaMask:", error);
            return null;
        }
    }
</script>

<div class="header">
    <Grid>
        <Grid.Col span={5} />
        <Grid.Col span={4} />
        <Grid.Col span={3}>
            <Button
                variant="gradient"
                gradient={button_style}
                on:click={connectMetaMask}
            >
                {connect_status}
            </Button>
        </Grid.Col>
    </Grid>
</div>

<style>
</style>
