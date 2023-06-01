import Hero from "@/app/components/home/Hero";
import Footer from "@/app/components/home/Footer";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <Hero />
      <Footer />
    </div>
  )
}
export default Root;