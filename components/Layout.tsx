import { useSession, signIn } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Layout({ children }: any) {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="bg-bgGray min-h-screen flex">
        <Nav />
        <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray w-screen h-screen flex items-center">
      <div className="text-center w-full">
        <button
          className="bg-white p-2 px-4 rounded-lg"
          onClick={() => signIn("google")}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
