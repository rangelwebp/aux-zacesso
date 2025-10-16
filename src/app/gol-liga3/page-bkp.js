"use client";

import React from "react";

import { useState } from "react";

import clubesLiga3 from "../data/clubesLiga3";
import { converterParaEmoji } from "../lib/utils";
import { GeneratedContentBlock } from "../components/GeneratedContentBlock";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import TitlePage from "@/components/ui/TitlePage";
import GerarOutroConteudo from "@/components/ui/GerarOutroConteudo";

export default function page() {
	const { setConteudoGerado } = useGeneratedContent();

	const [timeCasa, setTimeCasa] = useState("");
	const [timeFora, setTimeFora] = useState("");

	const [timeGol, setTimeGol] = useState("");
	const [tempoJogo, setTempoJogo] = useState("");
	const [placarCasa, setPlacarCasa] = useState("");
	const [placarFora, setPlacarFora] = useState("");

	const [rodada, setRodada] = useState("");
	const [fase, setFase] = useState("1ª Fase");

	const gerarPost = () => {
		let post = "";
		const placarCasaEmoji = converterParaEmoji(placarCasa);
		const placarForaEmoji = converterParaEmoji(placarFora);

		post = `🔔 TEM GOL NA #LIGA3PORTUGAL🇵🇹
⚽ ${timeGol}
⏰ ${tempoJogo}' - ${timeCasa} ${placarCasaEmoji}-${placarForaEmoji} ${timeFora}

🏆 Rodada ${rodada} | ${fase}`;

		setConteudoGerado(post);
	};

	return (
		<div>
			<div className="space-y-4">
				<TitlePage title="Tem gol na Liga 3" />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Time da Casa
						</label>
						<select
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
							value={timeCasa}
							onChange={(e) => setTimeCasa(e.target.value)}>
							<option value="">Selecione o time</option>
							{clubesLiga3.map((clube) => (
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
								type="number"
								className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
								value={placarCasa}
								onChange={(e) => setPlacarCasa(e.target.value)}
							/>
							<span className="mx-2">-</span>
							<input
								type="number"
								className="w-full rounded-md  bg-gray-800 border-gray-600 p-2 border"
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
							<option value="">Selecione o time</option>
							{clubesLiga3
								.filter((clube) => clube.nome !== timeCasa)
								.map((clube) => (
									<option key={clube.nome} value={clube.nome}>
										{clube.nome}
									</option>
								))}
						</select>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Time que marcou o gol
						</label>
						<select
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
							value={timeGol}
							onChange={(e) => setTimeGol(e.target.value)}>
							<option value="">Selecione o time</option>
							{timeCasa && (
								<option value={timeCasa}>{timeCasa}</option>
							)}
							{timeFora && (
								<option value={timeFora}>{timeFora}</option>
							)}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Tempo de Jogo (min)
						</label>
						<input
							type="text"
							className="w-full rounded-md border-gray-600 p-2 border"
							value={tempoJogo}
							onChange={(e) => setTempoJogo(e.target.value)}
						/>
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

					<div>
						<label className="block text-sm font-medium mb-1">
							Fase
						</label>
						<select
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border"
							value={fase}
							onChange={(e) => setFase(e.target.value)}>
							<option value="1ª Fase">1ª Fase</option>
							<option value="Fase de Manutenção">
								Fase de Manutenção
							</option>
							<option value="Fase de Acesso">
								Fase de Acesso
							</option>
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
		</div>
	);
}
