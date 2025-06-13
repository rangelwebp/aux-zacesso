"use client";

import React from "react";
import { useState } from "react";

import { GeneratedContentBlock } from "../components/GeneratedContentBlock";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import { converterParaEmoji } from "../lib/utils";
import TitlePage from "@/components/ui/TitlePage";

export default function page() {
	const { setConteudoGerado } = useGeneratedContent();

	const [placaresParaFormatar, setPlacaresParaFormatar] = useState("");

	const gerarPost = () => {
		if (!placaresParaFormatar) return;

		const linhas = placaresParaFormatar
			.split("\n")
			.filter((linha) => linha.trim());
		const resultadosFormatados = linhas.map((linha) => {
			// Procura pelo padrão: Qualquer texto, seguido de espaço, seguido de números,
			// seguido de 'x', seguido de números, seguido de espaço, seguido de qualquer texto
			const match = linha.match(/^(.+?)\s+(\d+)x(\d+)\s+(.+?)$/);

			if (match) {
				const [, timeCasa, golsCasa, golsFora, timeFora] = match;
				const golsCasaEmoji = converterParaEmoji(golsCasa);
				const golsForaEmoji = converterParaEmoji(golsFora);

				return `${timeCasa} ${golsCasaEmoji}-${golsForaEmoji} ${timeFora}`;
			}

			// Se não corresponder ao padrão, retorna a linha original
			return linha;
		});

		setConteudoGerado(resultadosFormatados.join("\n"));
	};
	return (
		<div>
			<TitlePage title="Formatar Placares" />

			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-2">
						Cole os placares (um por linha no formato "Time A 1x0
						Time B")
					</label>
					<textarea
						className="w-full rounded-md border-gray-300 p-2 border"
						rows="6"
						value={placaresParaFormatar}
						onChange={(e) =>
							setPlacaresParaFormatar(e.target.value)
						}
						placeholder="Sporting B 1x1 Amarante
Belenenses 1x3 Lusitânia de Lourosa
Atlético CP 1x2 1º de Dezembro"
					/>
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
