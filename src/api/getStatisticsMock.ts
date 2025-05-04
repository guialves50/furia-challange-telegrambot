export async function getStatisticsMock(matchId: number, teamId: number) {
  return {
    match_id: matchId,
    team_id: teamId,
    stats: {
      per_game_averages: {
        kills: 62.3,
        deaths: 55.1,
        headshots: 28.5,
        clutches_won: 1.4,
        entry_kills: 5.7,
        plants: 4.3,
        defuses: 2.1,
      },

      per_round_averages: {
        damage: 84.6,
        headshots: 0.42,
        clutches: 0.06,
        utility_damage: 12.3,
        flash_assists: 0.35,
        trade_kills: 0.44,
      },

      totals: {
        maps_played: 2,
        rounds_played: 54,
        total_kills: 125,
        total_deaths: 110,
        total_clutches: 3,
        total_flash_assists: 15,
        total_trade_kills: 18,
      },

      top_players: [
        {
          name: "KSCERATO",
          kills: 47,
          deaths: 29,
          headshots: 21,
          rating: 1.32,
          clutch_wins: 2,
        },
        {
          name: "yuurih",
          kills: 41,
          deaths: 30,
          headshots: 17,
          rating: 1.15,
          clutch_wins: 1,
        },
        {
          name: "chelo",
          kills: 25,
          deaths: 26,
          headshots: 10,
          rating: 0.98,
          clutch_wins: 0,
        },
      ],

      tactical: {
        first_kill_rate: "52%",
        ct_win_rate: "48%",
        t_win_rate: "54%",
        average_bomb_plants: 4.3,
        average_defuses: 2.1,
        most_played_map: "Mirage",
      }
    }
  };
}
