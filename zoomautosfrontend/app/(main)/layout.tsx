import Footer from "@/components/footer/footer";
import MoveNavbar from "@/components/navbar/navbar";
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MoveNavbar />
      <main>{children}</main>
      <Footer/>
    </>
  );
}
