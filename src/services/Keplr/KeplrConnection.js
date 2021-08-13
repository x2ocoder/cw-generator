console.debug('KeplrConnection');

import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

export default {
  address: null,
  possibleErrors: [
    {
      callback: () => {},
      type: 'account',
      possible: 'Error: Account does not exist on chain. Send some tokens there before trying to query sequence.',
      display: 'Account does not exist on chain. Fund your account first.'
    },
    {
      callback: () => {},
      type: 'account',
      possible: 'Error: Request rejected',
      display: 'It seems that you have cancelled the transaction. Try again.'
    },
    {
      callback: async (connection) => {
        await connection.resetClient();
      },
      type: 'account',
      possible: 'Error: There is no chain info for lucina',
      display: 'There is no chain info for lucina.'
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
  async addChain() {
    const prefix = "juno";
    const denom = "JUNO";
    const sdenom = "ujuno";
    const msg = {
      chainId: "lucina",
      chainName: "Juno Testnet",
      rpc: "https://rpc.juno.omniflix.co",
      rest: "https://api.juno.omniflix.co",
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: prefix,
        bech32PrefixAccPub: prefix + "pub",
        bech32PrefixValAddr: prefix + "valoper",
        bech32PrefixValPub: prefix + "valoperpub",
        bech32PrefixConsAddr: prefix + "valcons",
        bech32PrefixConsPub: prefix + "valconspub",
      },
      currencies: [
        {
          coinDenom: denom,
          coinMinimalDenom: sdenom,
          coinDecimals: 6,
        },
      ],
      feeCurrencies: [
        {
          coinDenom: denom,
          coinMinimalDenom: sdenom,
          coinDecimals: 6,
        },
      ],
      stakeCurrency: {
        coinDenom: denom,
        coinMinimalDenom: sdenom,
        coinDecimals: 6,
      },
      coinType: 118,
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.04,
      },
    };

    await window.keplr.experimentalSuggestChain(msg);
  },
  async connectKeplr() {
    let hasChain = false;
    console.debug('KeplrConnection::connectKeplr');

    if (!this.hasKeplr()) {
      return;
    }

    console.log('hasKeplr', true);

    const chainId = "lucina";

    try {
      await window.keplr.enable(chainId);
      hasChain = true;
    } catch (e) {
      console.log('error', e);
      if ((e.toString() !== "Error: There is no chain info for " + chainId)) {
        throw e;
      }
    }

    if (!hasChain) {
      console.log('!hasChain');
      await this.addChain();
      await window.keplr.enable(chainId);
    }

    console.log('hasChain');

    this.keplr_api_url = "https://rpc.juno.giansalex.dev";
    this.offlineSigner = window.getOfflineSigner(chainId);
    this.address = (await this.offlineSigner.getAccounts())[0].address;
    this.client = await SigningCosmWasmClient.connectWithSigner(this.keplr_api_url, this.offlineSigner);
  },
  async retryKeplrConnection() {
    console.debug('KeplrConnection::retryKeplrConnection');

    if (this.isKeplrConnected()) {
      return true;
    }

    await this.connectKeplr();

    return this.isKeplrConnected();
  },
  async getTransactionErrors(error) {
    console.debug('KeplrConnection::getTransactionErrors');

    let errors = {account: []};
    let hasPossibleError = false;
    const errorString = error.toString();

    for (let i = 0; i < this.possibleErrors.length; i++) {
      const possibleError = this.possibleErrors[i];

      if (possibleError.possible === errorString) {
        errors[possibleError.type].push(possibleError.display);
        hasPossibleError = true;

        try {
          await possibleError.callback(this);
        } catch (e) {
          return await this.getTransactionErrors(e);
        }
      }
    }

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
