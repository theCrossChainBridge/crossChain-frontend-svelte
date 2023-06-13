<script lang="ts">
    import { Button, Loader } from "@svelteuidev/core";
    import { abi, address, token_addr } from "./contract";
    import { ethers } from "ethers";
    import type { Contract } from "ethers";
    import { return_1, return_2, showProgress } from "../store/store";

    let from = "Sepolia";
    let to = "Mumbai";

    let amount: Number;

    const buttonStyles = {
        boxShadow: "0 2px 14px #228be6",
        transition: "all 0.2s ease-in-out",
        color: "white !important",
        textDecoration: "none !important",
        "&:hover": {
            boxShadow: "0 4px 20px #228be6",
        },
    };

    async function moveFunds() {
        showProgress.set(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract: Contract = new ethers.Contract(address, abi, signer);
        await contract.stake(token_addr, amount);
    }
</script>

<div class="bridge">
    <div class="Area1">
        <div class="from">
            <div class="fromNet">
                From: {from}
            </div>
            <div class="input_box">
                <div class="coin">Token</div>
                <input
                    type="text"
                    class="addr_input"
                    placeholder="Enter amount"
                    bind:value={amount}
                />
            </div>
        </div>
        <div class="to">
            <div class="toNet">
                To: {to}
            </div>
        </div>
    </div>
    <div class="Area2">
        <div class="summary">
            <div class="prompt">
                <h1>Summary</h1>
                <p>Bridging summary will appear here.</p>
            </div>
            <div class="loader">
                {#if $showProgress}
                    <div>It may take some time...</div>
                    <div class="load"><Loader variant="bars" /></div>
                {/if}
            </div>
            <p class="hash">{$return_1}</p>
            <p class="hash">{$return_2}</p>
        </div>
        <div class="transfer">
            <Button
                override={buttonStyles}
                size="lg"
                ripple
                on:click={moveFunds}>Move funds</Button
            >
        </div>
    </div>
</div>

<style>
    .bridge {
        margin: auto;
        margin-top: 50px;
        width: 75%;
        height: 450px;
        border: 1px;
        border-radius: 10px;
        background-color: white;

        display: grid;
        grid-template-columns: 1.5fr 1fr;
    }
    .Area1 {
        border-right: 1px solid rgb(200, 196, 196);
    }

    .from {
        margin: auto;
        margin-top: 20px;
        width: 90%;
        height: 150px;
        border: 1px;
        border-radius: 12px;
        background-color: rgb(17, 3, 61);
        overflow: auto;
    }
    .fromNet {
        color: white;
        margin-left: 20px;
        margin-top: 15px;
        width: 45%;
        height: 50px;
        border: 1px;
        border-radius: 20px;
        background-color: rgb(71, 68, 117);
        text-align: center;
        line-height: 50px;
        font-size: x-large;
    }
    .input_box {
        display: grid;
        grid-template-columns: 1fr 6fr;
        margin-left: 20px;
        margin-top: 15px;
        width: 90%;
        height: 50px;
        border: 1px solid black;
        border-radius: 8px;
        font-size: x-large;
        line-height: 50px;
        color: rgb(33, 5, 76);
        background-color: white;
    }
    .coin {
        color: rgb(49, 3, 63);
        margin-left: 10px;
    }
    .addr_input {
        font-size: x-large;
        height: 50px;
        outline: 1px;
        border-radius: 0 8px 8px 0;
        padding: 0;
        border-left: 1px solid rgb(216, 211, 211);
        border-right: 0;
        border-top: 0;
        border-bottom: 0;
        text-indent: 10px;
    }
    .to {
        margin: auto;
        width: 90%;
        height: 90px;
        margin-top: 30px;
        border: 1px;
        border-radius: 12px;
        background-color: rgb(27, 17, 161);
        overflow: auto;
    }
    .toNet {
        color: white;
        margin-left: 20px;
        margin-top: 20px;
        width: 45%;
        height: 50px;
        border: 1px;
        border-radius: 20px;
        background-color: rgb(83, 73, 230);
        text-align: center;
        line-height: 50px;
        font-size: x-large;
    }
    .Area2 {
        position: relative;
        /* padding-bottom: 50px; */
    }
    .prompt {
        margin-left: 20px;
        color: darkblue;
    }
    .loader {
        margin: auto;
        width: 50%;
        color: deeppink;
    }
    .load {
        margin: auto;
        width: 20%;
    }
    .hash {
        overflow: auto;
        white-space: normal;
        word-wrap: break-word;
        padding-top: 50px;
        margin: auto;
        width: 80%;
        background-image: linear-gradient(to right, #040bd3, #e92aa9);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .transfer {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>
