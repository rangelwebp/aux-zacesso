import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aside from "./components/Aside";
import { GeneratedContentProvider } from "./contexts/GeneratedContentContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata = {
	title: "Gerador de Posts - Zona de Acesso",
	description: "Gerador de Posts - Zona de Acesso",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} antialiased bg-gray-950 text-gray-100`}>
				<main className="max-w-4xl mx-auto min-h-screen flex items-center">
					<div className="w-full flex flex-col md:grid md:grid-cols-6 gap-4 md:gap-8 min-h-[640px] bg-gray-800 rounded-lg overflow-hidden">
						<Aside className="flex flex-col gap-8 justify-between items-center md:items-baseline md:col-span-2 md:gap-8 bg-gray-900 p-6 md:p-10" />

						<GeneratedContentProvider>
							<div className="md:col-span-4 p-6 md:p-10">
								{children}
							</div>
						</GeneratedContentProvider>
					</div>
				</main>
			</body>
		</html>
	);
}
