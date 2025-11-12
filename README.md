# 🕹️ Zockstar Games Developer Onboarding

Welcome to **Zockstar Games** — the decentralized studio building **GTZ**, the onchain version of GTA powered by **Solana** and inspired by **Zcash**.

This README will walk you through the repository structure, setup, local development, and contribution process.

---

## 🧱 Repository Layout

```
zockstar-games/
├── engine-unreal/             # Unreal Engine 5 project files for GTZ core game
│   ├── Config/
│   ├── Content/
│   └── Source/
│
├── engine-unity/              # Unity project for lighter WebGL/Mobile variants
│   ├── Assets/
│   └── Scripts/
│
├── engine-godot/              # Open-source Godot modules and tools
│   ├── scenes/
│   └── scripts/
│
├── contracts/                 # Solana smart contracts (Anchor framework)
│   ├── programs/
│   │   └── gtz_token/
│   │       └── src/lib.rs
│   ├── migrations/
│   └── Anchor.toml
│
├── zk/                        # Zero-knowledge circuits and proving systems
│   ├── circuits/
│   │   ├── proof_of_ownership.circom
│   │   └── private_trade.circom
│   └── scripts/
│       └── generate_proof.ts
│
├── tools/                     # CI/CD, deployment, and dev utilities
│   ├── docker/
│   └── scripts/
│
├── docs/                      # Developer documentation
│   └── CONTRIBUTING.md
│
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites

Make sure you have the following installed:

- [Rust](https://www.rust-lang.org/tools/install)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Node.js](https://nodejs.org/en/download)
- [Docker](https://www.docker.com/)
- [Circom](https://docs.circom.io/getting-started/installation/)
- [SnarkJS](https://github.com/iden3/snarkjs)

### Clone the Repository

```bash
git clone https://github.com/zockstargames/gtz.git
cd gtz
```

### Set Up Local Solana Validator

```bash
solana-test-validator --reset
```

Then, in another terminal:
```bash
solana config set --url localhost
solana airdrop 10
```

### Build and Deploy Smart Contracts

```bash
cd contracts
anchor build
anchor deploy
```

---

## 💰 Sample Anchor Program

Example from `contracts/programs/gtz_token/src/lib.rs`:

```rust
use anchor_lang::prelude::*;

declare_id!("GTZ111111111111111111111111111111111111111");

#[program]
pub mod gtz_token {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, supply: u64) -> Result<()> {
        let token = &mut ctx.accounts.token;
        token.supply = supply;
        token.authority = *ctx.accounts.authority.key;
        Ok(())
    }

    pub fn transfer(ctx: Context<Transfer>, amount: u64) -> Result<()> {
        let sender = &mut ctx.accounts.sender;
        let receiver = &mut ctx.accounts.receiver;

        require!(sender.balance >= amount, CustomError::InsufficientFunds);

        sender.balance -= amount;
        receiver.balance += amount;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 40)]
    pub token: Account<'info, Token>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Transfer<'info> {
    #[account(mut)]
    pub sender: Account<'info, Token>,
    #[account(mut)]
    pub receiver: Account<'info, Token>,
}

#[account]
pub struct Token {
    pub supply: u64,
    pub authority: Pubkey,
    pub balance: u64,
}

#[error_code]
pub enum CustomError {
    #[msg("Insufficient funds for transfer")]
    InsufficientFunds,
}
```

---

## 🧠 Example ZK Circuit (Circom)

`zk/circuits/proof_of_ownership.circom`

```circom
pragma circom 2.0.0;

template ProofOfOwnership() {
    signal input secretKey;
    signal input publicKey;
    signal output verified;

    component hash = Poseidon(2);
    hash.inputs[0] <== secretKey;
    hash.inputs[1] <== 0;

    verified <== (hash.out === publicKey);
}

component main = ProofOfOwnership();
```

### Compile and Generate Proof

```bash
cd zk
circom circuits/proof_of_ownership.circom --r1cs --wasm --sym
snarkjs groth16 setup proof_of_ownership.r1cs powersOfTau28_hez_final_10.ptau proof_of_ownership.zkey
snarkjs groth16 prove proof_of_ownership.zkey proof_of_ownership.witness.wtns proof.json public.json
```

---

## 🧩 Development Workflow

1. **Fork** the repository.  
2. **Create a new branch** for your feature:  
   ```bash
   git checkout -b feature/new-mechanic
   ```
3. **Test locally** with Solana test validator and Circom circuits.  
4. **Submit a PR** with clear documentation and commits.  
5. **Earn GTZ rewards** for verified contributions.

---

## 🛠️ Useful Commands

| Task | Command |
|------|----------|
| Build contracts | `anchor build` |
| Deploy contracts | `anchor deploy` |
| Run local validator | `solana-test-validator` |
| Compile circuits | `circom mycircuit.circom --r1cs --wasm` |
| Generate ZK proof | `snarkjs groth16 prove mycircuit.zkey mycircuit.wtns proof.json public.json` |
| Test all modules | `npm run test` |

---

## 👥 Contributing

We believe in building GTZ *together*.  
Check `docs/CONTRIBUTING.md` for guidelines on how to propose features, report bugs, and claim development bounties.

**Welcome to Zockstar Games.**  
Let’s build the onchain open world — fast, private, and free.

🚗💨 *Built in private. Played in freedom.*
