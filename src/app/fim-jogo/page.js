"use client";
import React from "react";

import { useState } from "react";
import clubesSegundaLiga from "@/data/clubesSegundaLiga";
import clubesLiga3 from "@/data/clubesLiga3";
import { converterParaEmoji } from "@/lib/utils";
import { GeneratedContentBlock } from "@/components/GeneratedContentBlock";
import { useGeneratedContent } from "@/contexts/GeneratedContentContext";
import TitlePage from "@/components/ui/TitlePage";

export default function page() {
	const [timeCasa, setTimeCasa] = useState("");
	const [timeFora, setTimeFora] = useState("");
	const [rodada, setRodada] = useState("");
	const [placarCasa, setPlacarCasa] = useState("0");
	const [placarFora, setPlacarFora] = useState("0");

	const [ligaSelecionada, setLigaSelecionada] = useState("segundaLiga");
	const [times, setTimes] = useState(clubesSegundaLiga);

	const { setConteudoGerado } = useGeneratedContent();

	const gerarPost = () => {
		const hashLiga =
			ligaSelecionada === "liga3" ? "Liga3Portugal" : "LigaPortugal2";
		let post = `⏰ FIM DE JOGO ⏰        
🆚 ${timeCasa} ${converterParaEmoji(placarCasa)}-${converterParaEmoji(
			placarFora
		)} ${timeFora}

🏆 #${hashLiga} | Rodada ${rodada}`;

		setConteudoGerado(post);
	};

	return (
		<div className="space-y-4">
			<TitlePage title="Fim de Jogo" />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Liga
					</label>
					<select
						className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
						value={ligaSelecionada}
						onChange={(e) => {
							const liga = e.target.value;
							setLigaSelecionada(liga);
							setTimes(
								liga === "segundaLiga"
									? clubesSegundaLiga
									: clubesLiga3
							);
							setTimeCasa("");
							setTimeFora("");
						}}>
						<option value="segundaLiga">Segunda Liga</option>
						<option value="liga3">Liga 3</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Rodada
					</label>
					<input
						type="number"
						className="w-full rounded-md border-gray-600 p-2 border"
						value={rodada}
						onChange={(e) => setRodada(e.target.value)}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Time da Casa
					</label>
					<select
						className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
						value={timeCasa}
						onChange={(e) => setTimeCasa(e.target.value)}>
						<option value="">Time da Casa</option>
						{times.map((clube) => (
							<option key={clube.nome} value={clube.nome}>
								{clube.nome}
							</option>
						))}
					</select>
				</div>
				<div className="text-center">
					<label className="block text-sm font-medium mb-1">
						Placar
					</label>
					<div className="flex justify-center items-center">
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
							value={placarCasa}
							onChange={(e) => setPlacarCasa(e.target.value)}
						/>
						<span className="mx-2">-</span>
						<input
							type="text"
							className="w-full rounded-md border-gray-600 p-2 border"
							value={placarFora}
							onChange={(e) => setPlacarFora(e.target.value)}
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Time Visitante
					</label>
					<select
						className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
						value={timeFora}
						onChange={(e) => setTimeFora(e.target.value)}>
						<option value="">Time Visitante</option>
						{times
							.filter((clube) => clube.nome !== timeCasa)
							.map((clube) => (
								<option key={clube.nome} value={clube.nome}>
									{clube.nome}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className="mt-6">
				<button
					onClick={gerarPost}
					className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition duration-200">
					Gerar Post
				</button>
			</div>

			<GeneratedContentBlock />
		</div>
	);
}
