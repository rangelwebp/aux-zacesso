"use client";

import { useRouter } from "next/navigation";

export default function GerarOutroConteudo({
	destino = "/bola-rolando",
	timeCasa,
	timeFora,
	rodada,
}) {
	const router = useRouter();

	const handleClick = () => {
		const query = new URLSearchParams({
			timeCasa,
			timeFora,
			rodada,
		}).toString();

		router.push(`${destino}?${query}`);
	};

	return (
		<button
			onClick={handleClick}
			className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition duration-200">
			Gerar Outro Conteúdo
		</button>
	);
}
