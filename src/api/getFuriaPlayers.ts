const BASE_URL = "https://api.pandascore.co";

export async function getFuriaPlayers() {
  const params = new URLSearchParams({
    token: process.env.PANDA_TOKEN || "",
    per_page: "10",
    "filter[team_id]": "124530",
    "filter[videogame_id]": "3",
  });

  try {
    const response = await fetch(`${BASE_URL}/players?${params.toString()}`, {
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
    console.error("Erro ao buscar jogadores:", error);
    return null;
  }
}
