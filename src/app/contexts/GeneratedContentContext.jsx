"use client";

import { createContext, useContext, useState } from "react";

const GeneratedContentContext = createContext();

export const GeneratedContentProvider = ({ children }) => {
	const [conteudoGerado, setConteudoGerado] = useState("");
	const [copiado, setCopiado] = useState(false);

	const copiarConteudo = () => {
		navigator.clipboard
			.writeText(conteudoGerado)
			.then(() => setCopiado(true))
			.catch((err) => console.error("Erro ao copiar: ", err));

		setTimeout(() => setCopiado(false), 2000); // Reset after 2 seconds
	};

	return (
		<GeneratedContentContext.Provider
			value={{
				conteudoGerado,
				setConteudoGerado,
				copiado,
				copiarConteudo,
			}}>
			{children}
		</GeneratedContentContext.Provider>
	);
};

export const useGeneratedContent = () => useContext(GeneratedContentContext);
