export default {
    label: "Juno Token Generator by @EZStaking",
    async instantiateCW20BaseContract(keplrConnection, formData) {
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
                    address: keplrConnection.address,
                    amount: formData.initial_supply.toString()
                }
            ],
            mint: {
                minter: formData.address,
                cap: formData.initial_supply.toString()
            }
        };

        return await keplrConnection.client.instantiate(
            keplrConnection.address,
            codeId,
            data,
            this.label
        );
    },
}
