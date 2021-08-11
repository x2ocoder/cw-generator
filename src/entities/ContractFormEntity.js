console.debug('ContractFormEntity');

export default {
    token_name: "",
    token_symbol: "",
    token_decimals: 18,
    initial_supply: null,
    total_supply: null,
    access_type: "Ownable",
    access_type_options: [
        { text: "None", value: "None" },
        { text: "Ownable", value: "Ownable" },
        { text: "Role Based", value: "Based" },
    ],
    supply_type: "Fixed",
    supply_type_options: [
        { text: "100k", value: "100k" },
        { text: "Fixed", value: "Fixed" },
        { text: "Unlimited", value: "Unlimited" },
        { text: "Capped", value: "Capped" }
    ],
    is_verified_source_code: true,
    is_copyright_off: false,
    is_token_burnable: false,
    is_token_mintable: false,
    is_operable: false,
    is_token_recoverable: false,
    token_type: "cw20-base",
    token_type_options: [
        { text: "SimpleCW20", value: "cw20-base" },
        { text: "cw20-bonding", value: "cw20-bonding" },
        { text: "cw20-escrow", value: "cw20-escrow" },
        { text: "cw20-merkle-airdrop", value: "cw20-merkle-airdrop" },
    ],
    token_network: "juno-testnet",
    token_network_options: [
        { text: "Juno", value: "juno"},
        { text: "Juno - Testnet", value: "juno-testnet"}
    ],
    is_agreement_checked: false,
}
