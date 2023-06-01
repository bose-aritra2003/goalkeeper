import AuthForm from "@/app/components/AuthForm";
import Brand from "@/app/components/Brand";

export const metadata = {
  title: 'Goalkeeper - Auth',
  description: 'Authentication page of Goalkeeper',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://goalkeeper.vercel.app',
    title: "Goalkeeper - Auth",
    siteName: 'Goalkeeper',
    description: "Authentication page of Goalkeeper",
    images: [
      {
        url: 'images/logo.svg',
        width: 256,
        height: 256,
      }
    ],
  },
  twitter: {
    title: "Goalkeeper - Auth",
    description: "Authentication page of Goalkeeper",
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

const Auth = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="rounded-xl bg-gray-500/10 backdrop-blur-sm px-8 py-10 drop-shadow-lg sm:px-12">
        <div className="text-white flex flex-col space-y-7">
          <div className="mx-auto">
            <Brand />
          </div>
          <AuthForm/>
        </div>
      </div>
    </div>
  )
}
export default Auth;