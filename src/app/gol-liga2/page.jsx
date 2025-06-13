import { Suspense } from "react";
import GolLiga2 from "./GolLiga2"; // Importe o componente que criamos
import TitlePage from "@/components/ui/TitlePage"; // Pode manter o título fora se quiser

export default function Page() {
	return (
		// O Suspense Boundary envolve o componente que usa hooks de cliente
		<Suspense fallback={<Loading />}>
			<GolLiga2 />
		</Suspense>
	);
}

// Um componente de loading simples para o fallback
function Loading() {
	return (
		<div>
			<TitlePage title="Bola Rolando" />
			<p>Carregando...</p>
		</div>
	);
}
