"use client";

import React, { useState } from "react";
import clubesLiga3 from "../data/clubesLiga3";
import TitlePage from "@/components/ui/TitlePage";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import { GeneratedContentBlock } from "../components/GeneratedContentBlock";

export default function Page() {
	const { setConteudoGerado } = useGeneratedContent();

	const [timeCasa, setTimeCasa] = useState("");
	const [timeVisitante, setTimeVisitante] = useState("");
	const [placar, setPlacar] = useState("");
	const [liga, setLiga] = useState("Liga 2");
	const [informacoes, setInformacoes] = useState("");
	const [estadio, setEstadio] = useState("");
	const [curiosidades, setCuriosidades] = useState("");
	const [brasileirosCasa, setBrasileirosCasa] = useState("");
	const [brasileirosVisitante, setBrasileirosVisitante] = useState("");
	const [relato, setRelato] = useState("");
	const [formattedText, setFormattedText] = useState("");

	function formatarTexto() {
		const curiosidadesFormatadas = curiosidades
			.split("\n")
			.map((item) => item.trim())
			.filter(Boolean)
			.map((item) => `- ${item}`)
			.join("\n");

		const brasileirosCasaFormatados = brasileirosCasa
			.split("\n")
			.map((item) => item.trim())
			.filter(Boolean)
			.join(", ");

		const brasileirosVisitanteFormatados = brasileirosVisitante
			.split("\n")
			.map((item) => item.trim())
			.filter(Boolean)
			.join(", ");

		const texto = `JOGO: ${timeCasa.toUpperCase()} ${placar} ${timeVisitante.toUpperCase()}
LIGA: ${liga.toUpperCase()}${
			informacoes ? ` - ${informacoes.toUpperCase()}` : ""
		}
ESTÁDIO: ${estadio.toUpperCase()}

[CURIOSIDADES]:
${curiosidadesFormatadas || "-"}

[BRASILEIROS]:
${timeCasa.toUpperCase()} : ${brasileirosCasaFormatados || "-"}
${timeVisitante.toUpperCase()} : ${brasileirosVisitanteFormatados || "-"}

[RELATO/LANCE A LANCE]:
${relato || "-"}`;

		setFormattedText(texto);
		setConteudoGerado(texto);
	}

	function copiarTexto() {
		if (!formattedText) return;
		navigator.clipboard.writeText(formattedText);
		alert("Texto copiado para a área de transferência!");
	}

	return (
		<div>
			<div className="space-y-6">
				<TitlePage title="Formatador Liga 2/3" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block mb-1 font-medium">
							Time da Casa
						</label>
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={timeCasa}
							onChange={(e) => setTimeCasa(e.target.value)}
							placeholder="Digite o time da casa"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">
							Time Visitante
						</label>
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={timeVisitante}
							onChange={(e) => setTimeVisitante(e.target.value)}
							placeholder="Digite o time visitante"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Placar</label>
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={placar}
							onChange={(e) => setPlacar(e.target.value)}
							placeholder="Ex: 1-0"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">Liga</label>
						<select
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={liga}
							onChange={(e) => setLiga(e.target.value)}>
							<option value="Liga 2">Liga 2</option>
							<option value="Liga 3">Liga 3</option>
						</select>
					</div>

					<div className="md:col-span-2">
						<label className="block mb-1 font-medium">
							Informações
						</label>
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={informacoes}
							onChange={(e) => setInformacoes(e.target.value)}
							placeholder="Ex: Rodada 3 - Grupo B"
						/>
					</div>

					<div className="md:col-span-2">
						<label className="block mb-1 font-medium">
							Estádio
						</label>
						<input
							type="text"
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={estadio}
							onChange={(e) => setEstadio(e.target.value)}
							placeholder="Nome do estádio"
						/>
					</div>
				</div>

				<div>
					<label className="block mb-1 font-medium">
						Curiosidades (uma por linha)
					</label>
					<textarea
						rows={3}
						className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
						value={curiosidades}
						onChange={(e) => setCuriosidades(e.target.value)}
						placeholder="Digite curiosidades"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block mb-1 font-medium">
							Brasileiros - Time da Casa (uma por linha)
						</label>
						<textarea
							rows={3}
							className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
							value={brasileirosCasa}
							onChange={(e) => setBrasileirosCasa(e.target.value)}
							placeholder="Ex: Jogador 1"
						/>
					</div>

					<div>
						<label className="block mb-1 font-medium">
							Brasileiros - Time Visitante (uma por linha)
						</label>
						<textarea
							rows={3}
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border text-white"
							value={brasileirosVisitante}
							onChange={(e) =>
								setBrasileirosVisitante(e.target.value)
							}
							placeholder="Ex: Jogador 2"
						/>
					</div>
				</div>

				<div>
					<label className="block mb-1 font-medium">
						Relato / Lance a Lance
					</label>
					<textarea
						rows={5}
						className="w-full rounded-md bg-gray-800 border-gray-600 p-2 border text-white"
						value={relato}
						onChange={(e) => setRelato(e.target.value)}
						placeholder="Digite o relato do jogo"
					/>
				</div>

				<div className="flex gap-4">
					<button
						onClick={formatarTexto}
						className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition">
						Formatar
					</button>

					<button
						onClick={copiarTexto}
						disabled={!formattedText}
						className={`px-6 py-2 rounded-md text-white ${
							formattedText
								? "bg-blue-600 hover:bg-blue-700"
								: "bg-gray-500 cursor-not-allowed"
						}`}>
						Copiar
					</button>
				</div>

				{formattedText && (
					<pre className="bg-gray-900 p-4 rounded text-white whitespace-pre-wrap mt-4">
						{formattedText}
					</pre>
				)}

				<GeneratedContentBlock />
			</div>
		</div>
	);
}
