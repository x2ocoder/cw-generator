console.debug('ContractFormOptions');

export default {
    access_type_options: [
        { text: "None", value: "None" },
        { text: "Ownable", value: "Ownable" },
        { text: "Role Based", value: "Based" },
    ],
    supply_type_options: [
        { text: "100k", value: "100k" },
        { text: "Fixed", value: "Fixed" },
        { text: "Unlimited", value: "Unlimited" },
        { text: "Capped", value: "Capped" }
    ],
    token_type_options: [
        { text: "SimpleCW20", value: "cw20-base" }, // https://docs.rs/cw20-base/0.8.0/cw20_base/msg/struct.InstantiateMsg.html
        { text: "StakingCW20", value: "cw20-staking", disabled: "true" }, // https://docs.rs/cw20-staking/0.8.0/cw20_staking/msg/struct.InstantiateMsg.html
        { text: "AtomicSwapCW20", value: "cw20-atomic_swap" }, // https://docs.rs/cw20-atomic-swap/0.8.0/cw20_atomic_swap/msg/struct.InstantiateMsg.html
        { text: "BondingCW20", value: "cw20-bonding", disabled: "true" }, // https://docs.rs/cw20-bonding/0.8.0/cw20_bonding/msg/struct.InstantiateMsg.html
        { text: "EscrowCW20", value: "cw20-escrow" }, // https://docs.rs/cw20-escrow/0.8.0/cw20_escrow/msg/struct.InstantiateMsg.html
        { text: "Ics20CW20", value: "cw20-ics20", disabled: "true" }, // https://docs.rs/cw20-ics20/0.8.0/cw20_ics20/msg/struct.InitMsg.html
        { text: "MerkleDropCW20", value: "cw20-merkleDrop", disabled: "true" },
    ],
    token_network_options: [
        { text: "Juno", value: "juno"},
        { text: "Juno - Testnet", value: "juno-testnet"}
    ],
}
