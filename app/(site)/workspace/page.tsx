import Header from "@/app/components/Header";
import Board from "@/app/components/Board";
import Modal from "@/app/components/Modal";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: 'Goalkeeper - Workspace',
  description: 'Welcome to your Goalkeeper workspace',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://goalkeeper.vercel.app',
    title: "Goalkeeper - Workspace",
    siteName: 'Goalkeeper',
    description: "Welcome to your Goalkeeper workspace",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Goalkeeper - Workspace",
    description: "Welcome to your Goalkeeper workspace",
    card: "summary_large_image",
    images: [
      {
        url: 'images/logo.png',
        width: 512,
        height: 512,
      }
    ],
  }
}

const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <main>
      <div className="flex flex-col space-y-5">
        <Header image={currentUser?.image}/>
        <Board />
        <Modal />
      </div>
    </main>
  )
}
export default Home;
