const BROADCAST_ONYX = 'BROADCAST_ONYX';

const subscriptions = [];

const Broadcast = {
    channel: new BroadcastChannel(BROADCAST_ONYX),
    sendMessage(message) {
        this.channel.postMessage(message);
    },
    subscribe(callback) {
        subscriptions.push(callback);
        this.channel.onmessage = (message) => {
            subscriptions.forEach(c => c(message));
        };
    },
    disconnect() {
        this.channel.close();
    },
};

export default Broadcast;
