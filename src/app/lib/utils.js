import numerosEmoji from "@/data/numerosEmoji";
import nacionalidades from "@/data/nacionalidades";

export const converterParaEmoji = (numero) => {
	if (!numero) return "";
	return numero
		.toString()
		.split("")
		.map((digito) => numerosEmoji[digito] || digito)
		.join("");
};

// Obter emoji da nacionalidade selecionada
export const getEmojiNacionalidade = (nacionalidadeSelecionada) => {
	const nac = nacionalidades.find((n) => n.nome === nacionalidadeSelecionada);
	return nac ? nac.emoji : "";
};

export function ordenarTimes(array) {
	return array.slice().sort((a, b) => {
		return a.nome.localeCompare(b.nome, "pt", { sensitivity: "base" });
	});
}
