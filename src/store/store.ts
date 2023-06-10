import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface WebSocketStore extends Writable<WebSocket | null> {
    connect: (url: string) => void;
    disconnect: () => void;
    sendMessage: (data: string | ArrayBuffer | Blob | ArrayBufferView) => void;
}

export const tx_hash = writable<string>("");
export const showProgress = writable<boolean>(false);

function createWebSocketStore(): WebSocketStore {
    const { subscribe, set, update } = writable<WebSocket | null>(null);

    function connect(url: string): void {
        const ws = new WebSocket(url);

        ws.addEventListener('open', (event) => {
            update((_) => ws);
            console.log("websocket is connected ...")
        });

        ws.addEventListener('message', (event) => {
            tx_hash.set(event.data);
            showProgress.set(false);
        }
        );

    }

    function disconnect(): void {
        update((ws) => {
            if (ws) {
                ws.close();
            }
            return null;
        });
    }
    function sendMessage(data: string | ArrayBuffer | Blob | ArrayBufferView): void {
        update((ws) => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(data);
            }
            return ws;
        });
    }


    return {
        subscribe,
        set,
        update,
        connect,
        disconnect,
        sendMessage
    };
}

export const websocket = createWebSocketStore();