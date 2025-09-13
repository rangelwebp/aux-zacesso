"use client";
import React from "react";

import { useState, useMemo } from "react";
import clubesSegundaLiga from "@/data/clubesSegundaLiga";
import nacionalidades from "@/data/nacionalidades";
import { converterParaEmoji, getEmojiNacionalidade } from "@/lib/utils";

import { GeneratedContentBlock } from "@/components/GeneratedContentBlock";
import { useGeneratedContent } from "@/contexts/GeneratedContentContext";
import { useSearchParams } from "next/navigation";

import TitlePage from "@/components/ui/TitlePage";
import GerarOutroConteudo from "@/components/ui/GerarOutroConteudo";

export default function GolLiga2() {
	const searchParams = useSearchParams();
	const { setConteudoGerado } = useGeneratedContent();

	const [timeCasa, setTimeCasa] = useState(
		searchParams.get("timeCasa") || ""
	);
	const [timeFora, setTimeFora] = useState(
		searchParams.get("timeFora") || ""
	);
	const [timeGol, setTimeGol] = useState("");

	const [placarCasa, setPlacarCasa] = useState("0");
	const [placarFora, setPlacarFora] = useState("0");

	const [tempoJogo, setTempoJogo] = useState("");
	// const [rodada, setRodada] = useState(searchParams.get("rodada") || "");
	const [autorGol, setAutorGol] = useState("");
	const [nacionalidadeSelecionada, setNacionalidadeSelecionada] =
		useState("Portugal");
	// const [comentarioGol, setComentarioGol] = useState("");

	const gerarPost = () => {
		const emoji = getEmojiNacionalidade(nacionalidadeSelecionada);
		const placarCasaEmoji = converterParaEmoji(placarCasa);
		const placarForaEmoji = converterParaEmoji(placarFora);

		let post = `⚽ GOOOL DO ${timeGol.toUpperCase()}

${timeCasa} ${placarCasaEmoji}-${placarForaEmoji} ${timeFora}

⏰ ${tempoJogo}' —— ${
			emoji
				? `${emoji} ${autorGol} marcou para o ${timeGol}`
				: `${autorGol} marcou para o ${timeGol}`
		}

🏆 #LigaPortugal2`;

		setConteudoGerado(post);
	};

	// --- LÓGICA PRINCIPAL DA IMAGEM ---
	const imagemGol = useMemo(() => {
		// Se nenhum time foi selecionado para o gol, retorna um array vazio
		if (!timeGol) {
			return [];
		}

		// Encontra o clube correspondente no array de dados
		const clube = clubesSegundaLiga.find((c) => c.nome === timeGol);

		// Se o clube for encontrado e tiver a propriedade 'gol'
		if (clube && clube.gol) {
			// Retorna o array no formato que o GeneratedContentBlock espera
			return [{ src: clube.gol, alt: `Imagem de gol do ${clube.nome}` }];
		}

		// Caso contrário, retorna um array vazio
		return [];
	}, [timeGol]); // O hook será re-executado sempre que 'timeGol' mudar

	return (
		<div>
			<div className="space-y-4">
				<TitlePage title="Gol" subtitle="Segunda Liga" />
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Time da Casa
						</label>
						<select
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
							value={timeCasa}
							onChange={(e) => setTimeCasa(e.target.value)}>
							<option value="">Selecione o time</option>
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
						<select
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
							value={timeFora}
							onChange={(e) => setTimeFora(e.target.value)}>
							<option value="">Selecione o time</option>
							{clubesSegundaLiga
								.filter((clube) => clube.nome !== timeCasa)
								.map((clube) => (
									<option key={clube.nome} value={clube.nome}>
										{clube.nome}
									</option>
								))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Time que marcou o gol
						</label>
						<select
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
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
							Placar
						</label>
						<div className="flex items-center">
							<input
								type="number"
								className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
								value={placarCasa}
								onChange={(e) => setPlacarCasa(e.target.value)}
							/>
							<span className="mx-2">-</span>
							<input
								type="number"
								className="w-full rounded-md border-gray-600 p-2 border"
								value={placarFora}
								onChange={(e) => setPlacarFora(e.target.value)}
							/>
						</div>
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
							Autor do Gol
						</label>
						<input
							type="text"
							className="w-full rounded-md border-gray-600 p-2 border"
							value={autorGol}
							onChange={(e) => setAutorGol(e.target.value)}
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">
							Nacionalidade do Jogador
						</label>
						<select
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
							value={nacionalidadeSelecionada}
							onChange={(e) =>
								setNacionalidadeSelecionada(e.target.value)
							}>
							{nacionalidades.map((nacionalidade) => (
								<option
									key={nacionalidade.nome}
									value={nacionalidade.nome}>
									{nacionalidade.emoji
										? `${nacionalidade.emoji} ${nacionalidade.nome}`
										: nacionalidade.nome}
								</option>
							))}
						</select>
					</div>

					<div className="sm:col-span-2">
						<label className="block text-sm font-medium mb-1">
							Comentário sobre o gol (opcional)
						</label>
						<textarea
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
							rows="3"
							value={comentarioGol}
							onChange={(e) => setComentarioGol(e.target.value)}
							placeholder="Ex: Grande finalização! Um golaço inacreditável!"></textarea>
					</div>

					<div className="">
						<button
							onClick={gerarPost}
							className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition duration-200">
							Gerar Post
						</button>
					</div>
				</div>

				<GeneratedContentBlock images={imagemGol} />
			</div>
		</div>
	);
}
