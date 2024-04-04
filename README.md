- Send btc: Tạo psbt sau đó kí bằng ví.

- Demo:
   
   - Step 1: Generate psbt
     ```bash
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
     const newOpreturns: string[] = ["This is a new OpReturn message", "Another OpReturn message"];

     // Update psbt
     btcPsbt.updatePsbt(inputs, outputs, newOpreturns);

     // Generated Psbt 
     const updatedPsbtHex = btcPsbt.toHex();
     ```

     - View data in https://mempool.space/testnet/
        
        - hash: Previous tx id
          ![image](https://github.com/hoangndm3139/btc-demo/assets/67066353/4a0bbcb2-a8e9-473c-932b-14a2316c2f3a)
        
        - index: Output index - 1
          ![image](https://github.com/hoangndm3139/btc-demo/assets/67066353/1392e88f-88fe-43ea-9c57-d97363a751b0)
        
        - nonWitnessUtxo: Buffer previous transaction hex 
          ![image](https://github.com/hoangndm3139/btc-demo/assets/67066353/3d1b4c52-eb01-4272-b3d2-982954d49005)
        
        - witnessUtxo: scriptPubkey & value 
          ![image](https://github.com/hoangndm3139/btc-demo/assets/67066353/e8d32e3c-70f6-4850-b488-19f8a8b94285)

   - Step 2: Sign psbt ( https://docs.unisat.io/dev/unisat-developer-service/unisat-wallet#signpsbt )
     ```bash
     try {
        let res = await window.unisat.signPsbt( "70736274ff01007d....", {
           autoFinalized:false,
           toSignInputs:[
              {
                 index: 0,
                 address: "tb1q8h8....mjxzny",
              },
           ]  
        }
     );
     console.log(res)
     } catch (e) {console.log(e)}
     ``` 

   - Step 3: Push psbt ( https://docs.unisat.io/dev/unisat-developer-service/unisat-wallet#pushpsbt )
     ```bash
     try {
        let res = await window.unisat.pushPsbt("70736274ff01007d....");
        console.log(res)
     } catch (e) {
        console.log(e);
     }
     ```

- Debug:
     - Decode transaction hex: https://live.blockcypher.com/btc/decodetx/
