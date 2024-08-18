"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();

  function format(str: string) {
    if (str.length <= 6) {
      return str;
    }

    const firstPart = str.slice(0, 3);
    const lastPart = str.slice(-3);

    return `${firstPart}...${lastPart}`;
  }

  const onClick = async () => {
    if (!connection || !publicKey) {
      return;
    }

    const programId = new web3.PublicKey(PROGRAM_ID);
    const programDataAccount = new web3.PublicKey(DATA_ACCOUNT_PUBKEY);
    const transaction = new web3.Transaction();

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: programDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    transaction.add(instruction);
    const signature = await sendTransaction(transaction, connection);
    const explorerUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

    toast({
      title: "✅ Tx confirmed",
      description: `${format(signature)}`,
      action: (
        <ToastAction altText="View Tx" asChild>
          <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
            👀 View Tx
          </a>
        </ToastAction>
      ),
    });
  };

  return (
    <Layout>
      <div className="flex justify-center pt-12">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Ping Solana Program</CardTitle>
            <CardDescription>
              Click the button below to send a transaction to a Solana program.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Make sure your wallet is connected before proceeding.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={onClick}>
              Ping !
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
