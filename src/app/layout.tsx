import { ReactNode, ReactElement } from "react";

export const metadata = {
  title: "Minesweeper",
  description: "The classic Minesweeper game made in React.Js",
};

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * RootLayout component that serves as the main layout for the application.
 * It wraps the children components with the basic HTML structure.
 *
 * @param {RootLayoutProps} props - The properties for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {React.ReactElement} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: RootLayoutProps): ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
