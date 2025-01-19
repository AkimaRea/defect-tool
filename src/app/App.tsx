import { Routes } from "@/pages";
import { createCtx } from "@reatom/framework";
import { reatomContext } from "@reatom/npm-react";
import '@/shared/styles/global.scss'

const ctx = createCtx();

export const App = () => {
	return (
		<reatomContext.Provider value={ctx}>
			<Routes />
		</reatomContext.Provider>
	);
};
