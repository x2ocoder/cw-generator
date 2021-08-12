console.debug('KeplrContract');

export default {
  label: "JunoMint by @EZStaking",
  async send(keplr, codeId, data, label) {
    console.debug('KeplrContract::Instantiate', codeId, data, label);

    return await keplr.client.instantiate(keplr.address, codeId, data, label);
  },
  async getTransactionErrors(keplr, error) {
    return await keplr.getTransactionErrors(error);
  },
  async instantiateCW20BaseContract(keplr, formData) {
    console.debug('KeplrContract::instantiateCW20BaseContract');

    const codeId = 51;
    const data = {
      name: formData.token_name,
      symbol: formData.token_symbol,
      decimals: 2,
      reserve_denom: "u" + formData.token_symbol,
      reserve_decimals: (formData.token_decimals - 2),
      curve_type: {
        linear: {
          slope: "1",
          scale: 1
        }
      },
      initial_balances: [
        {
          address: keplr.address,
          amount: formData.initial_supply.toString()
        }
      ],
      mint: {
        minter: keplr.address,
        cap: formData.initial_supply.toString()
      }
    };

    return await this.send(keplr, codeId, data, "SimpleCW20 - " + this.label );
  },
  async instantiateCW20StakingContract(keplr, formData) {
    console.debug('KeplrContract::instantiateCW20StakingContract');

    // const codeId = 52;
    const codeId = 56;
    const epochTime = 86400;
    const data = {
      name: formData.token_name,
      symbol: formData.token_symbol,
      decimals: 2,
      validator: "junovaloper18wgy6hy6yv3fvevl5pyfn7cvzx3t5use2vssnf",
      unbonding_period: (epochTime*4),
      exit_tax: 0.0,
      min_withdrawal: 0
    };

    return await this.send(keplr, codeId, data, "StakingCW20 - " + this.label);
  },
  async instantiateCW20AtomicSwapContract(keplr, formData) {
    console.debug('KeplrContract::instantiateCW20AtomicSwapContract');

    const codeId = 53;
    const data = {
      name: formData.token_name,
      symbol: formData.token_symbol,
      decimals: 2,
      reserve_denom: "u" + formData.token_symbol,
      reserve_decimals: (formData.token_decimals - 2),
      curve_type: {
        linear: {
          slope: "1",
          scale: 1
        }
      },
      initial_balances: [
        {
          address: keplr.address,
          amount: formData.initial_supply.toString()
        }
      ],
      mint: {
        minter: keplr.address,
        cap: formData.initial_supply.toString()
      }
    };

    return await this.send(keplr, codeId, data, "AtomicSwapCW20 - " + this.label);
  },
  async instantiateCW20BondingContract(keplr, formData) {
    console.debug('KeplrContract::instantiateCW20BondingContract');

    const codeId = 54;
    const data = {
      name: formData.token_name,
      symbol: formData.token_symbol,
      decimals: 2,
      reserve_denom: "u" + formData.token_symbol,
      reserve_decimals: (formData.token_decimals - 2),
      curve_type: {
        linear: {
          slope: "1",
          scale: 1
        }
      },
      initial_balances: [
        {
          address: keplr.address,
          amount: formData.initial_supply.toString()
        }
      ],
      mint: {
        minter: keplr.address,
        cap: formData.initial_supply.toString()
      }
    };

    return await this.send(keplr.address, codeId, data, "BondingCW20 - " + this.label);
  },
  async instantiateCW20EscrowContract(keplr, formData) {
    console.debug('KeplrContract::instantiateCW20EscrowContract');

    const codeId = 55;
    const data = {
      name: formData.token_name,
      symbol: formData.token_symbol,
      decimals: 2,
      reserve_denom: "u" + formData.token_symbol,
      reserve_decimals: (formData.token_decimals - 2),
      curve_type: {
        linear: {
          slope: "1",
          scale: 1
        }
      },
      initial_balances: [
        {
          address: keplr.address,
          amount: formData.initial_supply.toString()
        }
      ],
      mint: {
        minter: keplr.address,
        cap: formData.initial_supply.toString()
      }
    };

    return await this.send(keplr, codeId, data, "EscrowCW20 - " + this.label);
  },
}
