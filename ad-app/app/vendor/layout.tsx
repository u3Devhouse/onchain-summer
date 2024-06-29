import Header from "./_components/Header";

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section>{children}</section>
    </>
  );
}
