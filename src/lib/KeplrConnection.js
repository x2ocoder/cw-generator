console.debug('KeplrConnection');

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

export default {
    address: null,
    hasKeplr() {
        console.debug('KeplrConnection::hasKeplr');

        return window.getOfflineSigner && window.keplr
    },
    isKeplrConnected() {
        console.debug('KeplrConnection::isKeplrConnected');

        return this.client !== undefined && this.client !== null;
    },
    async connectKeplr() {
        console.debug('KeplrConnection::connectKeplr');

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
        console.debug('KeplrConnection::retryKeplrConnection');

        if (this.isKeplrConnected()) {
            return true;
        }

        await this.connectKeplr();

        return this.isKeplrConnected();
    },
}
