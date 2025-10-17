import Link from "next/link";
import React from "react";
import LogoLight from "./ui/LogoLight";

export default function Aside({ className }) {
	return (
		<aside className={className}>
			<div>
				<LogoLight width={32} height={32} />
			</div>
			<div className="flex justify-center sm:flex-col gap-4 overflow-x-auto sm:overflow-visible">
				<Link className="text-4xl sm:text-base font-medium" href="/">
					📋 <span className="hidden sm:inline">Escalações</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/bola-rolando">
					🔥 <span className="hidden sm:inline">Bola Rolando</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/gol-liga2">
					⚽ <span className="hidden sm:inline">Gol na Liga 2</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/gol-liga3">
					⚽ <span className="hidden sm:inline">Gol na Liga 3</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/fim-jogo">
					⏰ <span className="hidden sm:inline">Fim de jogo</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/placar">
					🆚 <span className="hidden sm:inline">Placares</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/revisor">
					📝 <span className="hidden sm:inline">Revisor</span>
				</Link>
				<Link
					className="text-4xl sm:text-base font-medium"
					href="/relatos">
					📃 <span className="hidden sm:inline">Relatos</span>
				</Link>
			</div>
			<footer className="hidden sm:block">
				<small>Criado por Rangel Xavier</small>
			</footer>
		</aside>
	);
}
