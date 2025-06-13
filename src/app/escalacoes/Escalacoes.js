"use client";

import React from "react";

import clubesSegundaLiga from "@/data/clubesSegundaLiga";
import { useState } from "react";
import { GeneratedContentBlock } from "@/components/GeneratedContentBlock";
import { useGeneratedContent } from "@/contexts/GeneratedContentContext";
import { useSearchParams } from "next/navigation";

import TitlePage from "@/components/ui/TitlePage";
import GerarOutroConteudo from "@/components/ui/GerarOutroConteudo";

export default function Escalacoes() {
	const searchParams = useSearchParams();
	const { setConteudoGerado } = useGeneratedContent();
	// Estados para início de jogo (Segunda Liga)
	const [timeCasa, setTimeCasa] = useState(
		searchParams.get("timeCasa") || ""
	);
	const [timeFora, setTimeFora] = useState(
		searchParams.get("timeFora") || ""
	);
	const [rodada, setRodada] = useState(searchParams.get("rodada") || "");
	const [horario, setHorario] = useState("");
	const [estadio, setEstadio] = useState("");
	const [sportTV, setSportTV] = useState(true);

	const atualizarEstadio = (time) => {
		const clube = clubesSegundaLiga.find((c) => c.nome === time);
		setTimeCasa(time);
		if (clube) {
			setEstadio(clube.estadio);
		}

		// Se o time da casa e visitante forem iguais, limpa o time visitante
		if (time === timeFora) {
			setTimeFora("");
		}
	};

	const gerarPost = () => {
		let post = "";

		post = `📋 TIMES ESCALADOS! 📋
🆚 ${timeCasa} vs ${timeFora}
🏆 #LigaPortugal2 | Rodada ${rodada}
⏰ Hoje, daqui a pouco às ${horario}
🏟️ ${estadio}
${sportTV ? "📺 @sporttvportugal" : ""}
📲 Acompanhe nossa cobertura!
`;
		setConteudoGerado(post);
	};

	return (
		<div>
			<div className="space-y-4">
				<TitlePage title="Escalação" subtitle="Segunda Liga" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Time da Casa */}
					<div>
						<label className="block text-sm font-medium mb-1">
							Time da Casa
						</label>
						<select
							value={timeCasa}
							onChange={(e) => atualizarEstadio(e.target.value)}
							className="w-full p-2 border border-gray-600 bg-gray-800 rounded-md">
							<option value="">Selecione o time da casa</option>
							{clubesSegundaLiga.map((clube) => (
								<option key={clube.nome} value={clube.nome}>
									{clube.nome}
								</option>
							))}
						</select>
					</div>
					{/* Time de Fora */}
					<div>
						<label className="block text-sm font-medium mb-1">
							Time de Visitante
						</label>
						<select
							value={timeFora}
							onChange={(e) => setTimeFora(e.target.value)}
							className="w-full p-2 border border-gray-600 bg-gray-800 rounded-md">
							<option value="">
								Selecione o time de visitante
							</option>
							{clubesSegundaLiga.map((clube) => (
								<option key={clube.nome} value={clube.nome}>
									{clube.nome}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					{/* Rodada */}
					<div>
						<label className="block text-sm font-medium mb-1">
							Rodada
						</label>
						<input
							type="number"
							value={rodada}
							onChange={(e) => setRodada(e.target.value)}
							className="w-full p-2 border border-gray-600 rounded-md"
						/>
					</div>
					{/* Horário */}
					<div>
						<label className="block text-sm font-medium mb-1">
							Horário
						</label>
						<input
							type="time"
							value={horario}
							onChange={(e) => setHorario(e.target.value)}
							className="w-full p-2 border border-gray-600 rounded-md"
						/>
					</div>
					{/* Estádio */}
					<div>
						<label className="block text-sm font-medium mb-1">
							Estádio
						</label>
						<input
							type="text"
							className="w-full rounded-md border-gray-600 p-2 border"
							value={estadio}
							onChange={(e) => setEstadio(e.target.value)}
							disabled
						/>
					</div>
				</div>
				<div className="w-full">
					<label className="flex items-center">
						<input
							type="checkbox"
							className="rounded border-gray-300 text-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mr-2"
							checked={sportTV}
							onChange={(e) => setSportTV(e.target.checked)}
						/>
						<span>Transmissão Sport TV</span>
					</label>
					<div className="flex gap-4 mt-6">
						<button
							onClick={gerarPost}
							className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition duration-200">
							Gerar Post
						</button>
						{timeCasa &&
							timeFora &&
							rodada &&
							horario &&
							estadio &&
							sportTV && (
								<GerarOutroConteudo
									timeCasa={timeCasa}
									timeFora={timeFora}
									rodada={rodada}
								/>
							)}
					</div>
				</div>
				<GeneratedContentBlock />
			</div>
		</div>
	);
}
