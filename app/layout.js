import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/_services/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "> SNIPPETS_",
  description: "a collection of useful code blocks and resources",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
