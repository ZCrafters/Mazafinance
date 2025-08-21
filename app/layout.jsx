import "@/styles/globals.css";

export const metadata = {
  title: "Maza Finance",
  description: "Financial Freedom for New Generation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="night">
      <body className="font-[Inter]">{children}</body>
    </html>
  );
}
