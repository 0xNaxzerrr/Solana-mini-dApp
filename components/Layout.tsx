"use client";
import { FC, useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-8 sm:px-6 lg:px-8">{children}</div>
  );
};
