import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        {children}
      </div> 
      <Footer />
    </div>
  );
}
