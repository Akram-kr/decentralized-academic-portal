# Decentralized Academic Portal (Final project Deliberation & Diploma Management)

A secure, decentralized Web3 platform designed for universities to manage final-year graduation project (PFE) deliberations, automate grade calculations via smart contracts, and securely mint digital diplomas using blockchain technology and IPFS storage.

---

## 🚀 Key Features

### 1. PFE Deliberation Session Engine
* **Automated Admin Setup:** Authorized administrators initialize deliberation sessions directly linked to student credentials fetched from academic databases.
* **Multi-Role Jury Validation:** Enforces secure, distinct inputs for the **Président**, **Promoteur**, and **Examinateurs**.
* **On-Chain Grade Finalization:** Implements transparent mathematical calculations directly inside the EVM to distribute final grades and academic mentions safely without human tampering.

### 2. Batch Diploma Minting & Verification
* **Multi-Signature Workflow:** Implements a rigorous validation chain requiring cryptographic signatures from both the **Dean (Doyen)** and the **Rector (Recteur)** before execution.
* **Automated Metadata Processing:** Connects seamlessly to a backend API to generate digital certificate assets, uploading metadata layers straight to **IPFS** before on-chain minting hooks trigger.
* **Irreversible Cancellations:** Allows quick administrative rollbacks with explicit data-logged reason strings if faulty student profiles are detected pre-finalization.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, Lucide React
* **Web3 Integration:** Wagmi v2, Viem, `@wagmi/core`
* **Smart Contracts:** Solidity (^0.8.24), OpenZeppelin AccessControl (RBAC)
* **Storage Framework:** Decentralized IPFS

---

## 📋 Prerequisites & Configuration

Create a `.env.local` file in your root folder and configure the following environment variables:

```env
NEXT_PUBLIC_DELIBERATION_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_FILE_STORAGE_ADDRESS=0x...
NEXT_PUBLIC_DIPLOMA_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=https://...

## 🔄 Detailed Platform Workflow

The platform bridges university administrative processes with the blockchain through a 3-phase lifecycle:

### Phase 1: Deliberation & Evaluation
1. **Session Initialization:** An administrator (`ADMIN_ROLE`) creates an on-chain deliberation session for a student using their unique identification data (Matricule + Academic Year).
2. **Jury Evaluation:** Four distinct jury members (President, Promoter, and two Examiners) securely input their respective grades.
3. **On-Chain Calculation:** The smart contract automatically calculates the final average grade and determines the student's graduation status without human intervention.

### Phase 2: Diploma Certification (Batch Processing)
1. **Proposal:** Validated student files are aggregated into a "Batch" (Lot) of diplomas.
2. **Double Endorsement:** 
   * The **Dean (Doyen)** reviews the batch and signs it cryptographically on-chain.
   * The **Rector (Recteur)** performs the final institutional check and applies the second required signature.
3. **Metadata & IPFS Upload:** The admin triggers the finalization. The backend API generates secure PDF certificates, uploads them to IPFS, and returns the unique CIDs.

### Phase 3: Minting
1. **Token Generation:** The smart contract consumes the IPFS hashes and mints the official immutable digital diplomas to the blockchain.
