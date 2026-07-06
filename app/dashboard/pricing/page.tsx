import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-2xl text-center">
            <div className="mb-6 inline-flex rounded-full border px-4 py-2 text-sm font-medium">
              🚀 Coming Soon
            </div>

            <h1 className="mb-4 text-5xl font-bold">
              Pricing Page Coming Soon
            </h1>

            <p className="mb-8 text-lg text-gray-500">
              We're working on flexible pricing plans for CrixLink. Check back
              soon for updates.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Back Home
              </Link>

              <Link
                href="/dashboard"
                className="rounded-lg border px-6 py-3 font-semibold hover:bg-gray-100"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
