import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-red-400 flex">
      <nav className="w-20 bg-red-400 text-white flex flex-col items-center py-6 space-y-6 fixed h-full">
        <Link href="/">
          <div className="p-2 rounded-lg hover:bg-red-300 transition-colors">
            <Image src="/images/dashboards.png" alt="Dashboard" width={40} height={40} />
          </div>
        </Link>
        <Link href="/signup">
          <div className="p-2 rounded-lg hover:bg-red-300 transition-colors">
            <Image src="/images/add-user.png" alt="Signup" width={40} height={40} />
          </div>
        </Link>
        <button className="logout">
          <div className="p-2 rounded-lg hover:bg-red-300 transition-colors">
            <Image src="/images/turn-off.png" alt="Logout" width={40} height={40} />
          </div>
        </button>
      </nav>

      <main className="flex-1 flex justify-center items-center p-8 ml-20">
        <div className="w-[107%] h-[105%] bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold">Welcome to Learnify</h1>
          <p>Your dashboard content goes here...</p>
        </div>
      </main>
    </div>
    
  );
}
