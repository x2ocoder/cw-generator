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
        { text: "SimpleCW20", value: "cw20-base" },
        { text: "StakingCW20", value: "cw20-staking", disabled: "true" },
        { text: "AtomicSwapCW20", value: "cw20-atomic_swap", disabled: "true"  },
        { text: "BondingCW20", value: "cw20-bonding", disabled: "true"  },
        { text: "EscrowCW20", value: "cw20-escrow", disabled: "true"  },
        { text: "Ics20CW20", value: "cw20-ics20", disabled: "true" },
        { text: "MerkleDropCW20", value: "cw20-merkleDrop", disabled: "true" },
    ],
    token_network_options: [
        { text: "Juno", value: "juno"},
        { text: "Juno - Testnet", value: "juno-testnet"}
    ],
}
