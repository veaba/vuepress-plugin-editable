const appDomain = "https://bot.veaba.me/";
// const appDomain = "http://127.0.0.1:8081/";
const redirectAPI = "api/redirect/github";
const clientId = "Iv1.f8c5b24e304d03c9";
export const updateAPI = appDomain + "api/content/update";
export const getContentAPI = appDomain + "api/content/get";
export const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${appDomain}${redirectAPI}`;
export const fetchOps = {
	mode: "cors",
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	redirect: "follow", // manual, *follow, error
	referrer: "no-referrer", // *client, no-referrer
};
