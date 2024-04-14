import Header from "@/components/common/header";

function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <div className="overflow-hidden">
        <div className="w-full border p-4 overflow-hidden rounded-md">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
