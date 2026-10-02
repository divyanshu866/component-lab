'use client";';
import PaddleProvider from "@/components/paddle/PaddleProvider";

export default function UpgradeLayout({ children }) {
  return (
    <>
      <PaddleProvider />
      {children}
    </>
  );
}
