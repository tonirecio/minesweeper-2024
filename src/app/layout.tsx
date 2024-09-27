import { ReactNode, ReactElement } from "react";

export const metadata = {
  title: "Minesweeper",
  description: "The classic Minesweeper game made in React.Js",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
