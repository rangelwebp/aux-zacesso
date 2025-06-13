"use client";

import React from "react";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { GeneratedContentBlock } from "../components/GeneratedContentBlock";
import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import TitlePage from "@/components/ui/TitlePage";
import { InferenceClient } from "@huggingface/inference";

export default function page() {
	const { setConteudoGerado } = useGeneratedContent();
	const [tom, setTom] = useState("corretor");
	const [texto, setTexto] = useState("");
	const [loading, setLoading] = useState(false);

	const client = new InferenceClient(process.env.NEXT_PUBLIC_HF_TOKEN);

	function getPrompt(tom, info) {
		const tons = {
			neutro: `Você é um jornalista brasileiro esportivo. Com base nas informações abaixo, gere um texto claro, objetivo e bem escrito, em até 200 caracteres:\n\n${info}`,
			entusiasmado: `Você é um jornalista brasileiro esportivo. Com base nas informações abaixo, gere um texto empolgante, com emoção e entusiasmo, em até 200 caracteres:\n\n${info}`,
			formal: `Você é um jornalista brasileiro esportivo. Com base nas informações abaixo, gere um texto formal, técnico e informativo, em até 200 caracteres:\n\n${info}`,
			criativo: `Você é um jornalista brasileiro esportivo. Com base nas informações abaixo, gere um texto criativo, descontraído e bem-humorado, em até 200 caracteres:\n\n${info}`,
			minimalista: `Você é um jornalista brasileiro esportivo. Com base nas informações abaixo, gere uma manchete curta, direta e impactante, em até 200 caracteres:\n\n${info}`,
			corretor: `Você é um especialista em gramática da Língua Portuguesa (variante brasileira). Corrija apenas erros gramaticais, de acentuação, pontuação, concordância e tempo verbal no texto abaixo, sem alterar o estilo ou acrescentar informações:\n\n${info}`,
		};

		return tons[tom] || tons.neutro;
	}

	async function gerarTexto(prompt) {
		try {
			const chatCompletion = await client.chatCompletion({
				provider: "hyperbolic",
				model: "meta-llama/Llama-3.3-70B-Instruct",
				messages: [
					{
						role: "user",
						content: prompt,
					},
				],
			});

			console.log(chatCompletion); // Mantém para depurar

			const mensagem = chatCompletion.choices[0].message.content;
			return mensagem;
		} catch (error) {
			console.error("Erro ao gerar conteúdo:", error);
			return null;
		}
	}

	async function gerar() {
		setLoading(true); // começa o loading
		try {
			const prompt = getPrompt(tom, texto);
			const res = await gerarTexto(prompt);
			const resultado = res || "Erro na geração";
			setConteudoGerado(resultado);
		} catch (error) {
			console.error(error);
			setConteudoGerado("Erro na geração");
		} finally {
			setLoading(false); // encerra o loading
		}
	}

	return (
		<>
			<div>
				<TitlePage title="Revisor de Texto" />

				<div className="space-y-4">
					<div className="flex flex-col space-y-2">
						<label htmlFor="tom">Tom:</label>
						<select
							id="tom"
							className="w-full rounded-md border-gray-600 bg-gray-800 p-2 border"
							value={tom}
							onChange={(e) => setTom(e.target.value)}>
							<option value="corretor">Corretor</option>
							<option value="neutro">Neutro</option>
							<option value="entusiasmado">Entusiasmado</option>
							<option value="formal">Formal</option>
							<option value="criativo">Criativo</option>
							<option value="minimalista">Minimalista</option>
						</select>
					</div>

					<div className="flex flex-col space-y-2">
						<label htmlFor="texto">Texto:</label>
						<textarea
							id="texto"
							className="w-full rounded-md border-gray-300 p-2 border"
							rows="6"
							value={texto}
							onChange={(e) => setTexto(e.target.value)}
						/>
					</div>

					<button
						className="bg-emerald-600 text-white py-2 px-6 rounded-md hover:bg-emerald-700 transition duration-200 flex gap-2 items-center"
						disabled={loading}
						onClick={gerar}>
						{loading && (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						)}
						{loading ? "Revisando..." : "Revisar"}
					</button>

					<GeneratedContentBlock />
				</div>
			</div>
		</>
	);
}
