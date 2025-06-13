import React from "react";

export default function TitlePage({ title, subtitle = "" }) {
	return (
		<h3 className="text-2xl font-semibold mb-6">
			{title}{" "}
			{subtitle && (
				<span className="text-sm uppercase font-light">
					{" "}
					{subtitle}
				</span>
			)}
		</h3>
	);
}
