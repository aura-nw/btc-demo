import * as bitcoin from "bitcoinjs-lib";
import { BtcPsbt, TxInput, TxOutput } from "./transaction.js";

// Create psbt
const btcPsbt = new BtcPsbt(bitcoin.networks.testnet);

// Add inputs
const inputs: TxInput[] = [
    {
       hash: "6e7307c...0eddabbd", // prev ix id
       index: 1, // output index - 1,
       nonWitnessUtxo: Buffer.from("02000000000...36e0100000000", "hex") // prev tx hex
 // // If this input was segwit, instead of nonWitnessUtxo,
 // // you would add a witnessUtxo as follows. The scriptPubkey and the value only are needed.
     // witnessUtxo: {
     //   script: Buffer.from(
     //     '76a9148bbc...18d88ac', // ScriptPubKey
     //     'hex',
     //   ),
     //   value: 90000,
     // },
    }
 ]

// Add outputs
const outputs: TxOutput[] = [
    { address: 'tb1qkd5...szesvjf7', value: 100 }, // to address
    { address: 'tb1qqjmc...x4w4lgwsku0', value: 16250 } // from address - to pay fee (optional)
]

// Add memos
const newOpreturns: string[] = [ "This is a new OpReturn message", "Another OpReturn message" ];

// Update psbt
btcPsbt.updatePsbt(inputs, outputs, newOpreturns);

// Generated Psbt
const updatedPsbtHex = btcPsbt.toHex();
