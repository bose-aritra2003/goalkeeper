import '@/app/styles/globals.css'
import AuthContext from "@/app/context/AuthContext";
import ToasterContext from "@/app/context/ToasterContext";

export const metadata = {
  title: 'Goalkeeper - Home',
  description: 'Simple, lightweight & elegant task manager for the modern world',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://goalkeeper.vercel.app',
    title: "Goalkeeper - Home",
    siteName: 'Goalkeeper',
    description: "Simple, lightweight & elegant task manager for the modern world",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Goalkeeper - Home",
    description: "Simple, lightweight & elegant task manager for the modern world",
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

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100 scroll-smooth">
        <div className="fixed top-0 left-0 w-full h-3/4 bg-gradient-to-br from-yellow-400 via-rose-400 to-blue-400 rounded-md blur-3xl opacity-50 -z-50"/>
        <ToasterContext />
        <AuthContext>
          { children }
        </AuthContext>
      </body>
    </html>
  )
}
export default AuthLayout;
