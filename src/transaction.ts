import { PsbtInput } from "bip174/src/lib/interfaces.js";
import * as bitcoin from "bitcoinjs-lib";

export interface TxOutput {
    address?: string;
    script?: Buffer;
    value: number;
}

export interface TxInput extends PsbtInput {
    hash: string | Buffer;
    index: number;
}

export class BtcPsbt {
    private psbt: bitcoin.Psbt;

    constructor(network: bitcoin.Network) {
        this.psbt = new bitcoin.Psbt({ network });
    }

    addInput(input: TxInput): this {
        this.psbt.addInput(input);
        return this;
    }

    addOutput(output: TxOutput): this {
        if (output.address) {
            this.psbt.addOutput({
                address: output.address,
                value: output.value
            });
        } else if (output.script) {
            this.psbt.addOutput({
                script: output.script,
                value: output.value
            });
        }
        return this;
    }

    addOpreturn(opreturn: string): this {
        const data = Buffer.from(opreturn, 'utf8');
        const embed = bitcoin.payments.embed({ data: [data] });
        this.addOutput({
            script: embed.output,
            value: 0,
        });
        return this;
    }

    updatePsbt(inputs: TxInput[], outputs: TxOutput[], opreturns: string[]): void {
        inputs.forEach((input) => this.addInput(input));

        outputs.forEach((output) => this.addOutput(output));

        opreturns.forEach((opreturn) => this.addOpreturn(opreturn));
    }

    toHex(): string {
        return this.psbt.toHex();
    }
}