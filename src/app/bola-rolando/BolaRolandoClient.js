"use client";

import clubesSegundaLiga from "./../data/clubesSegundaLiga";
import clubesLiga3 from "./../data/clubesLiga3";
import { useState, useMemo } from "react";
import { GeneratedContentBlock } from "../components/GeneratedContentBlock";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import TitlePage from "@/components/ui/TitlePage";
import { useSearchParams } from "next/navigation";
import GerarOutroConteudo from "@/components/ui/GerarOutroConteudo";

export default function BolaRolandoClient() {
	const searchParams = useSearchParams();
	const { setConteudoGerado } = useGeneratedContent();

	const [liga, setLiga] = useState("Segunda Liga");
	const [timeCasa, setTimeCasa] = useState(
		searchParams.get("timeCasa") || ""
	);
	const [timeFora, setTimeFora] = useState(
		searchParams.get("timeFora") || ""
	);
	const [estadio, setEstadio] = useState("");

	const [cidade, setCidade] = useState("");

	// Lista dinâmica conforme a liga
	const clubes = useMemo(() => {
		return liga === "Segunda Liga" ? clubesSegundaLiga : clubesLiga3;
	}, [liga]);

	const atualizarInfoTimeCasa = (time) => {
		const clube = clubes.find((c) => c.nome === time);
		setTimeCasa(time);
		if (clube) {
			setEstadio(clube.estadio);
			setCidade(clube.cidade);
		}

		// Se o time da casa e visitante forem iguais, limpa o time visitante
		if (time === timeFora) {
			setTimeFora("");
		}
	};

	const gerarPost = () => {
		let post = "";

		if (liga === "Segunda Liga") {
			post = `🔥 BOLA ROLANDO 🔥
NO ${estadio.toUpperCase()}

📍 ${cidade}
🆚 ${timeCasa} 0️⃣-0️⃣ ${timeFora}
`;
		} else {
			post = `🔥 BOLA ROLANDO NA #LIGA3PORTUGAL🔥 
📍 ${estadio}

🆚 ${timeCasa} 0️⃣-0️⃣ ${timeFora}
`;
		}

		setConteudoGerado(post);
	};

	// Imagens conforme liga
	const imagens = useMemo(() => {
		if (liga === "Liga 3") {
			const escudoCasa = clubes.find((c) => c.nome === timeCasa)?.escudo;
			const escudoFora = clubes.find((c) => c.nome === timeFora)?.escudo;
			const imgs = [];
			if (escudoCasa)
				imgs.push({ src: escudoCasa, alt: `Escudo de ${timeCasa}` });
			if (escudoFora)
				imgs.push({ src: escudoFora, alt: `Escudo de ${timeFora}` });
			return imgs;
		} else {
			const estadioFoto = clubes.find(
				(c) => c.nome === timeCasa
			)?.estadioFoto;
			return estadioFoto
				? [
						{
							src: estadioFoto,
							alt: `Estádio ${estadio}`,
						},
				  ]
				: [];
		}
	}, [liga, timeCasa, timeFora, estadio, clubes]);

	return (
		<div className="space-y-4">
			<TitlePage title="Bola Rolando" subtitle={liga} />

			<div>
				<label className="block text-sm font-medium mb-1">Liga</label>
				<select
					value={liga}
					onChange={(e) => {
						setLiga(e.target.value);
						setTimeCasa("");
						setTimeFora("");
						setEstadio("");
					}}
					className="w-full p-2 border border-gray-600 bg-gray-800 rounded-md">
					<option value="Segunda Liga">Segunda Liga</option>
					<option value="Liga 3">Liga 3</option>
				</select>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Time da Casa
					</label>
					<select
						value={timeCasa}
						onChange={(e) => atualizarInfoTimeCasa(e.target.value)}
						className="w-full p-2 border border-gray-600 bg-gray-800 rounded-md">
						<option value="">Selecione o time da casa</option>
						{clubes.map((clube) => (
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
						onChange={(e) => setTimeFora(e.target.value)}
					/>
					<datalist id="timeFora">
						<option value="">Time Visitante</option>
						{clubes
							.filter((clube) => clube.nome !== timeCasa)
							.map((clube) => (
								<option key={clube.nome} value={clube.nome}>
									{clube.nome}
								</option>
							))}
					</datalist>
				</div>
			</div>

			<div className="mt-6 flex gap-4">
				<button
					onClick={gerarPost}
					className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition duration-200">
					Gerar Post
				</button>

				{timeCasa && timeFora && (
					<GerarOutroConteudo
						destino="/gol-liga2"
						timeCasa={timeCasa}
						timeFora={timeFora}
					/>
				)}
			</div>
			{timeCasa && timeFora && <GeneratedContentBlock images={imagens} />}
		</div>
	);
}
