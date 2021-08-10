console.debug('KeplrConnection');

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

export default {
    address: null,
    possibleErrors: [
        {
            type: 'account',
            possible: 'Error: Account does not exist on chain. Send some tokens there before trying to query sequence.',
            display: 'Account does not exist on chain. Fund your account first.'
        },
        {
            type: 'account',
            possible: 'Error: Request rejected',
            display: 'It seems that you have cancelled the transaction. Try again.'
        }
    ],
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
    getTransactionErrors(error) {
        let errors = {account: []};
        let hasPossibleError = false;
        const errorString = error.toString();

        this.possibleErrors.forEach((possibleError) => {
            if (possibleError.possible === errorString) {
                errors[possibleError.type].push(possibleError.display);
                hasPossibleError = true;
            }
        });

        if (!hasPossibleError) {
            errors.account.push(errorString);
            console.error(errorString);
        }

        return errors;
    },
    resetClient() {
        this.client = undefined;
        return this;
    },
    async selfUpdate() {
        await (this.resetClient()).retryKeplrConnection();
        return this;
    }
}
