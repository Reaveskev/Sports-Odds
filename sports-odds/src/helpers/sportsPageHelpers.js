export function normalizeEspnGame(event) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];

  const home = competitors[0] || {};
  const away = competitors[1] || {};
  const status = event.status || {};

  return {
    id: event.id,
    team_one: {
      name: home.team?.name || "",
      logo: home.team?.logo || "",
      score: home.score || "",
      record: home.records?.[0]?.summary || "",
      abbrev: home.team?.abbreviation || "",
    },
    team_two: {
      name: away.team?.name || "",
      logo: away.team?.logo || "",
      score: away.score || "",
      record: away.records?.[0]?.summary || "",
      abbrev: away.team?.abbreviation || "",
    },
    game_progress: {
      detail: status.type?.detail || "",
      description: status.type?.description || "",
      completed: status.type?.completed || false,
      period: status.period || 0,
      clock: status.displayClock || "",
      status: status.type?.state || "",
    },
    shortName: event.shortName || "",
    odds: competition?.odds?.[0]?.details || null,
  };
}

export function groupGamesByStatus(events = []) {
  const upcoming = [];
  const inprogress = [];
  const completed = [];

  events.forEach((event) => {
    const game = normalizeEspnGame(event);

    if (game.game_progress.status === "pre") {
      upcoming.push(game);
    } else if (game.game_progress.status === "in") {
      inprogress.push(game);
    } else if (game.game_progress.status === "post") {
      completed.push(game);
    }
  });

  return { upcoming, inprogress, completed };
}

export function normalizeEspnNews(articles = []) {
  return articles.map((news) => ({
    headline: news.headline || "",
    description: news.description || "",
    image: news.images?.[0]?.url || "",
    links: news.links?.web?.href || "#",
  }));
}

export function combineNewsSources(espnArticles = [], customArticles = []) {
  return [...normalizeEspnNews(espnArticles), ...customArticles];
}

export function normalizeEspnMlbStandings(data) {
  const leagues = data?.children || [];

  return leagues.map((league) => {
    const entries = league?.standings?.entries || [];

    const teams = entries.map((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const wins =
        stats.find((stat) => stat.type === "wins")?.displayValue || "0";

      const losses =
        stats.find((stat) => stat.type === "losses")?.displayValue || "0";

      return {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        wins,
        losses,
      };
    });

    return {
      conference: league?.name || "",
      teams,
    };
  });
}
