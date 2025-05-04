const BASE_URL = "https://api.pandascore.co";

export async function getUltimosJogos() {
  const params = new URLSearchParams({
    token: process.env.PANDA_TOKEN || "",
    per_page: "5",
    "filter[opponent_id]": "124530",
  });

  try {
    const response = await fetch(`${BASE_URL}/matches/past?${params.toString()}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return null;
  }
}
