"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const defaultReceiver = "DaiPesi8ZCLiYLeX38tFTY55ahmAed9oQULzZC2VXvUy";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [receiverAddr, setReceiverAddr] = useState(defaultReceiver);
  const [amount, setAmount] = useState(0.1);

  function format(str: string) {
    if (str.length <= 6) {
      return str;
    }

    const firstPart = str.slice(0, 3);
    const lastPart = str.slice(-3);

    return `${firstPart}...${lastPart}`;
  }

  const onClick = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (!connection || !publicKey) {
      toast({
        title: "❌ No account detected",
        description: `Please connect your wallet`,
      });
      return;
    }

    try {
      const transaction = new web3.Transaction();

      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new web3.PublicKey(receiverAddr),
        lamports: amount * LAMPORTS_PER_SOL,
      });

      transaction.add(sendSolInstruction);
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
    } catch (error) {
      console.error(error);
      toast({
        title: "❌ Transaction failed",
        description: "There was an error processing your transaction.",
      });
    }
  };

  return (
    <Layout>
      <div className="flex justify-center pt-12">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Transfer some SOL</CardTitle>
            <CardDescription>
              Click the button below to send a transaction to a Solana address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col space-y-1.5 mb-4">
                <Label htmlFor="receiver">Receiver</Label>
                <Input
                  id="receiver"
                  placeholder="Address of the receiver"
                  value={receiverAddr}
                  onChange={(e) => setReceiverAddr(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="amount">Amount (in SOL)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.1"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={onClick}>
              SEND
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
