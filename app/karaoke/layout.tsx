import React from "react";
import { KtLayout } from "./KtLayout";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return <KtLayout>{children}</KtLayout>;
}

export default HomeLayout;
