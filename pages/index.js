import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppContext } from "../context/state";

export default function Home() {
  const router = useRouter();
  const { merchant } = useAppContext();

  useEffect(() => {
    if (merchant?.brandName) {
      router.push("/products");
    } else {
      router.push("/signin");
    }
  }, [merchant?.brandName, router]);

  return (
    <>
      <div className="bg-pwprimary-100 h-screen">
        <Head>
          <title>Pricewards Merchant Portal</title>
          <meta
            name="Merchant Portal for Pricewards E-Commerce"
            content="Portal"
          />
        </Head>
      </div>
    </>
  );
}
