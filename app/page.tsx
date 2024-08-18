"use client";
import Image from "next/image";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="mb-8">
          <Image
            src="/solana-logo.png" // Assurez-vous que vous avez un logo Solana dans le dossier public
            alt="Solana Logo"
            width={150}
            height={150}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Solana Course
        </h1>
        <p className="text-lg mb-6">
          This application is a hands-on course designed to teach you the
          fundamentals of Solana development, following the official
          documentation. Whether you're new to blockchain development or looking
          to expand your skills, this course will guide you through the process
          of building on the Solana blockchain.
        </p>
        <p className="text-lg mb-6">
          Learn how to interact with Solana, create and deploy smart contracts,
          and build decentralized applications (dApps) with ease.
        </p>
        <Button variant="default" size="lg" className="w-auto">
          Get Started
        </Button>
      </div>
    </Layout>
  );
}
