console.debug('KeplrContract');

export default {
    label: "Juno Token Generator by @EZStaking",
    getTransactionErrors(keplr, error) {
        return keplr.getTransactionErrors(error);
    },
    async instantiateCW20BaseContract(keplr, formData) {
        console.debug('KeplrContract::instantiateCW20BaseContract');

        const codeId = 34;
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

        return await keplr.client.instantiate(
            keplr.address,
            codeId,
            data,
            this.label
        );
    },
}
