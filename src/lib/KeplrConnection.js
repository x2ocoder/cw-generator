import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

export default {
    address: null,
    client: null,
    hasKeplr() {
        return window.getOfflineSigner && window.keplr
    },
    isKeplrConnected() {
        return this.client !== undefined && this.client !== null;
    },
    getAddress() {
        return this.address
    },
    async connectKeplr() {
        if (!this.hasKeplr()) {
            return;
        }

        const chainId = "lucina";
        await window.keplr.enable(chainId);

        this.keplr_api_url = "https://rpc.juno.giansalex.dev";
        this.offlineSigner = window.getOfflineSigner(chainId);
        this.address = (await this.offlineSigner.getAccounts())[0].address;
        this.client = await SigningCosmWasmClient.connectWithSigner(
            this.keplr_api_url,
            this.offlineSigner
        );
    },
    async retryKeplrConnection() {
        if (this.isKeplrConnected()) {
            return true;
        }

        await this.connectKeplr();

        return this.isKeplrConnected();
    },
}
