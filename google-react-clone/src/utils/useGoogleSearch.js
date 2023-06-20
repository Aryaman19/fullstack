import { useState, useEffect } from "react";
import { config } from "./config";

const API_KEY = config.apiKey;
const CONTEXT_KEY = config.googleSearchKey;

const useGoogleSearch = (term) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			fetch(
				`https://www.googleapis.com/customsearch/v1?key=
        ${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
			)
				.then((response) => response.json())
				.then((result) => {
					setData(result);
				});
		};
		fetchData();
	}, [term]);

	return { data };
};

export default useGoogleSearch;
