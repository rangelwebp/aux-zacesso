"use client";

import { useGeneratedContent } from "../contexts/GeneratedContentContext";
import { Copy, Trash } from "lucide-react";

export const GeneratedContentBlock = ({ images }) => {
	const { conteudoGerado, copiado, copiarConteudo, setConteudoGerado } =
		useGeneratedContent();

	const limparConteudo = () => {
		setConteudoGerado("");
	};

	return (
		<>
			{conteudoGerado && (
				<div className="border border-gray-600 rounded-lg shadow-md p-6 space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold">Post Gerado:</h2>
						<button
							onClick={copiarConteudo}
							className="flex items-center bg-gray-800 hover:bg-gray-700 transition duration-200 py-1 px-3 rounded-md text-sm">
							<Copy className="w-4 h-4 mr-1" />
							{copiado ? "Copiado!" : "Copiar"}
						</button>
					</div>

					<div className="bg-gray-700 text-gray-100 p-4 rounded-md whitespace-pre-line">
						{conteudoGerado}
					</div>

					{/* Imagens, se houverem */}
					{images && images.length > 0 && (
						<div
							className={`${
								images.length === 1
									? ""
									: "grid grid-cols-2 gap-4 justify-center"
							}`}>
							{images.map((image, index) => (
								<img
									key={index}
									src={image.src}
									alt={image.alt || `Imagem ${index + 1}`}
									className={`rounded-md shadow-md ${
										images.length === 1
											? "w-full"
											: "w-full h-auto rounded-md shadow-md object-contain"
									}`}
								/>
							))}
						</div>
					)}

					<button
						onClick={limparConteudo}
						className="flex items-center transition duration-200 py-1 px-3 mt-2 rounded-md text-sm">
						<Trash className="w-4 h-4 mr-1" />
						Limpar
					</button>
				</div>
			)}
		</>
	);
};
