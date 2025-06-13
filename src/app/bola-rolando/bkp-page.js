"use client";

import clubesSegundaLiga from "./../data/clubesSegundaLiga";
import { useState } from "react";
import { GeneratedContentBlock } from "../components/GeneratedContentBlock";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import TitlePage from "@/components/ui/TitlePage";
import { useSearchParams } from "next/navigation";
import GerarOutroConteudo from "@/components/ui/GerarOutroConteudo";

export default function page() {
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

	const [estadio, setEstadio] = useState("");

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

		post = `🔥 BOLA ROLANDO 🔥
NO ${estadio.toUpperCase()}

🆚 ${timeCasa} 0️⃣-0️⃣ ${timeFora}
`;
		setConteudoGerado(post);
	};

	return (
		<div className="space-y-4">
			<TitlePage title="Bola Rolando" subtitle="Segunda Liga" />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

				<div>
					<label className="block text-sm font-medium mb-1">
						Time Visitante
					</label>
					<input
						list="timeFora"
						className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
						value={timeFora}
						onChange={(e) => setTimeFora(e.target.value)}></input>

					<datalist id="timeFora">
						<option value="">Time Visitante</option>
						{clubesSegundaLiga
							.filter((clube) => clube.nome !== timeCasa)
							.map((clube) => (
								<option key={clube.nome} value={clube.nome}>
									{clube.nome}
								</option>
							))}
					</datalist>
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
			<div className="mt-6 flex gap-4">
				<button
					onClick={gerarPost}
					className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition duration-200">
					Gerar Post
				</button>
				{timeCasa && timeFora && rodada && (
					<GerarOutroConteudo
						destino="/gol-liga2"
						timeCasa={timeCasa}
						timeFora={timeFora}
						rodada={rodada}
					/>
				)}
			</div>
			{/* Criar um contexto para armazenar o conteudoGerado */}
			<GeneratedContentBlock />
		</div>
	);
}
