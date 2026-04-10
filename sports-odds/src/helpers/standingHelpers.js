function getStatDisplayValue(stats = [], type) {
  return stats.find((stat) => stat.type === type)?.displayValue || "0";
}

function sortTeamsByRecord(teams = []) {
  return [...teams].sort((a, b) => {
    const winsA = Number(a.wins);
    const winsB = Number(b.wins);

    if (winsB !== winsA) {
      return winsB - winsA;
    }

    const lossesA = Number(a.losses);
    const lossesB = Number(b.losses);

    return lossesA - lossesB;
  });
}

const MLB_DIVISIONS = {
  AL: {
    East: ["NYY", "BOS", "TOR", "BAL", "TB"],
    Central: ["CLE", "DET", "MIN", "CHW", "KC"],
    West: ["HOU", "SEA", "TEX", "LAA", "ATH"],
  },
  NL: {
    East: ["ATL", "PHI", "NYM", "MIA", "WSH"],
    Central: ["CHC", "MIL", "STL", "CIN", "PIT"],
    West: ["LAD", "SD", "SF", "ARI", "COL"],
  },
};

function getMlbDivision(leagueAbbrev, teamAbbrev) {
  const league = MLB_DIVISIONS[leagueAbbrev];
  if (!league) return "Other";

  for (const [divisionName, teams] of Object.entries(league)) {
    if (teams.includes(teamAbbrev)) {
      return divisionName;
    }
  }

  return "Other";
}

export function normalizeEspnMlbStandingsByDivision(data) {
  const leagues = data?.children || [];

  return leagues.map((league) => {
    const leagueName = league?.name || "";
    const leagueAbbrev = league?.abbreviation || "";
    const entries = league?.standings?.entries || [];

    const divisions = {
      East: [],
      Central: [],
      West: [],
      Other: [],
    };

    entries.forEach((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const teamInfo = {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: getStatDisplayValue(stats, "wins"),
        losses: getStatDisplayValue(stats, "losses"),
      };

      const division = getMlbDivision(leagueAbbrev, teamInfo.abbrev);
      divisions[division].push(teamInfo);
    });

    return {
      conference: leagueName,
      divisions: Object.entries(divisions)
        .filter(([, teams]) => teams.length > 0)
        .map(([divisionName, teams]) => ({
          division: divisionName,
          teams: sortTeamsByRecord(teams),
        })),
    };
  });
}

const NBA_DIVISIONS = {
  East: {
    Atlantic: ["BOS", "BKN", "NY", "PHI", "TOR"],
    Central: ["CHI", "CLE", "DET", "IND", "MIL"],
    Southeast: ["ATL", "CHA", "MIA", "ORL", "WSH"],
  },
  West: {
    Northwest: ["DEN", "MIN", "OKC", "POR", "UTAH"],
    Pacific: ["GS", "LAC", "LAL", "PHX", "SAC"],
    Southwest: ["DAL", "HOU", "MEM", "NO", "SA"],
  },
};

function getNbaDivision(conferenceAbbrev, teamAbbrev) {
  const conference = NBA_DIVISIONS[conferenceAbbrev];
  if (!conference) return "Other";

  for (const [divisionName, teams] of Object.entries(conference)) {
    if (teams.includes(teamAbbrev)) {
      return divisionName;
    }
  }

  return "Other";
}

export function normalizeEspnNbaStandingsByDivision(data) {
  const conferences = data?.children || [];

  return conferences.map((conference) => {
    const conferenceName = conference?.name || "";
    const conferenceAbbrev = conference?.abbreviation || "";
    const entries = conference?.standings?.entries || [];

    const divisions = {
      Atlantic: [],
      Central: [],
      Southeast: [],
      Northwest: [],
      Pacific: [],
      Southwest: [],
      Other: [],
    };

    entries.forEach((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const teamInfo = {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: getStatDisplayValue(stats, "wins"),
        losses: getStatDisplayValue(stats, "losses"),
      };

      const division = getNbaDivision(conferenceAbbrev, teamInfo.abbrev);
      divisions[division].push(teamInfo);
    });

    return {
      conference: conferenceName,
      divisions: Object.entries(divisions)
        .filter(([, teams]) => teams.length > 0)
        .map(([divisionName, teams]) => ({
          division: divisionName,
          teams: sortTeamsByRecord(teams),
        })),
    };
  });
}

const NFL_DIVISIONS = {
  AFC: {
    East: ["BUF", "MIA", "NE", "NYJ"],
    North: ["BAL", "CIN", "CLE", "PIT"],
    South: ["HOU", "IND", "JAX", "TEN"],
    West: ["DEN", "KC", "LV", "LAC"],
  },
  NFC: {
    East: ["DAL", "NYG", "PHI", "WSH"],
    North: ["CHI", "DET", "GB", "MIN"],
    South: ["ATL", "CAR", "NO", "TB"],
    West: ["ARI", "LAR", "SF", "SEA"],
  },
};

function getNflDivision(conferenceAbbrev, teamAbbrev) {
  const conference = NFL_DIVISIONS[conferenceAbbrev];
  if (!conference) return "Other";

  for (const [divisionName, teams] of Object.entries(conference)) {
    if (teams.includes(teamAbbrev)) {
      return divisionName;
    }
  }

  return "Other";
}

export function normalizeEspnNflStandingsByDivision(data) {
  const conferences = data?.children || [];

  return conferences.map((conference) => {
    const conferenceName = conference?.name || "";
    const conferenceAbbrev = conference?.abbreviation || "";
    const entries = conference?.standings?.entries || [];

    const divisions = {
      East: [],
      North: [],
      South: [],
      West: [],
      Other: [],
    };

    entries.forEach((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const teamInfo = {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: getStatDisplayValue(stats, "wins"),
        losses: getStatDisplayValue(stats, "losses"),
      };

      const division = getNflDivision(conferenceAbbrev, teamInfo.abbrev);
      divisions[division].push(teamInfo);
    });

    return {
      conference: conferenceName,
      divisions: Object.entries(divisions)
        .filter(([, teams]) => teams.length > 0)
        .map(([divisionName, teams]) => ({
          division: divisionName,
          teams: sortTeamsByRecord(teams),
        })),
    };
  });
}

const NHL_DIVISIONS = {
  East: {
    Atlantic: ["BOS", "BUF", "DET", "FLA", "MTL", "OTT", "TB", "TOR"],
    Metropolitan: ["CAR", "CBJ", "NJ", "NYI", "NYR", "PHI", "PIT", "WSH"],
  },
  West: {
    Central: ["CHI", "COL", "DAL", "MIN", "NSH", "STL", "UTA", "WPG"],
    Pacific: ["ANA", "CGY", "EDM", "LA", "SEA", "SJ", "VAN", "VGK"],
  },
};

function getNhlDivision(conferenceAbbrev, teamAbbrev) {
  const conference = NHL_DIVISIONS[conferenceAbbrev];
  if (!conference) return "Other";

  for (const [divisionName, teams] of Object.entries(conference)) {
    if (teams.includes(teamAbbrev)) {
      return divisionName;
    }
  }

  return "Other";
}

export function normalizeEspnNhlStandingsByDivision(data) {
  const conferences = data?.children || [];

  return conferences.map((conference) => {
    const conferenceName = conference?.name || "";
    const conferenceAbbrev = conference?.abbreviation || "";
    const entries = conference?.standings?.entries || [];

    const divisions = {
      Atlantic: [],
      Metropolitan: [],
      Central: [],
      Pacific: [],
      Other: [],
    };

    entries.forEach((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const teamInfo = {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: getStatDisplayValue(stats, "wins"),
        losses: getStatDisplayValue(stats, "losses"),
      };

      const division = getNhlDivision(conferenceAbbrev, teamInfo.abbrev);
      divisions[division].push(teamInfo);
    });

    return {
      conference: conferenceName,
      divisions: Object.entries(divisions)
        .filter(([, teams]) => teams.length > 0)
        .map(([divisionName, teams]) => ({
          division: divisionName,
          teams: sortTeamsByRecord(teams),
        })),
    };
  });
}

export function normalizeEspnWnbaStandings(data) {
  const conferences = data?.children || [];

  return conferences.map((conference) => {
    const entries = conference?.standings?.entries || [];

    const teams = entries.map((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      return {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: getStatDisplayValue(stats, "wins"),
        losses: getStatDisplayValue(stats, "losses"),
      };
    });

    return {
      conference: conference?.name || "",
      divisions: [
        {
          division: "",
          teams: sortTeamsByRecord(teams),
        },
      ],
    };
  });
}

function getRecordFromSummary(stats = []) {
  const totalRecord =
    stats.find((stat) => stat.type === "total")?.summary ||
    stats.find((stat) => stat.name === "overall")?.summary ||
    "0-0";

  const [wins = "0", losses = "0"] = totalRecord.split("-");

  return { wins, losses };
}

export function normalizeEspnCfbStandings(data) {
  const conferences = data?.children || [];

  return conferences.map((conference) => {
    const entries = conference?.standings?.entries || [];

    const teams = entries.map((entry) => {
      const team = entry?.team || {};
      const stats = entry?.stats || [];

      const record = getRecordFromSummary(stats);

      return {
        logo: team?.logos?.[0]?.href || "",
        team_name: team?.displayName || "",
        abbrev: team?.abbreviation || "",
        wins: record.wins,
        losses: record.losses,
      };
    });

    return {
      conference: conference?.name || "",
      divisions: [
        {
          division: "",
          teams: sortTeamsByRecord(teams),
        },
      ],
    };
  });
}

export function normalizeFeaturedEspnGame(event, league = "") {
  const competition = event?.competitions?.[0];
  const competitors = competition?.competitors || [];

  const home =
    competitors.find((team) => team.homeAway === "home") ||
    competitors[0] ||
    {};
  const away =
    competitors.find((team) => team.homeAway === "away") ||
    competitors[1] ||
    {};

  const status = event?.status || {};
  const state = status?.type?.state || "";

  return {
    id: `${league}-${event?.id || Math.random()}`,
    league,
    team_one: {
      name: away?.team?.displayName || away?.team?.name || "",
      logo: away?.team?.logo || "",
      score: away?.score || "",
      record: away?.records?.[0]?.summary || "",
      abbrev: away?.team?.abbreviation || "",
    },
    team_two: {
      name: home?.team?.displayName || home?.team?.name || "",
      logo: home?.team?.logo || "",
      score: home?.score || "",
      record: home?.records?.[0]?.summary || "",
      abbrev: home?.team?.abbreviation || "",
    },
    game_progress: {
      detail: status?.type?.detail || "",
      description: status?.type?.description || "",
      completed: status?.type?.completed || false,
      period: status?.period || 0,
      clock: status?.displayClock || "",
      status: state,
    },
    shortName: event?.shortName || "",
    odds: competition?.odds?.[0]?.details || null,
    date: event?.date || "",
  };
}

function getFeaturedPriority(game) {
  if (game.game_progress.status === "in") return 1;
  if (game.game_progress.status === "pre") return 2;
  if (game.game_progress.status === "post") return 3;
  return 4;
}

export function sortFeaturedGames(games = []) {
  return [...games].sort((a, b) => {
    const priorityDiff = getFeaturedPriority(a) - getFeaturedPriority(b);
    if (priorityDiff !== 0) return priorityDiff;

    // upcoming -> earliest first
    if (a.game_progress.status === "pre" && b.game_progress.status === "pre") {
      return new Date(a.date) - new Date(b.date);
    }

    // completed -> most recent first
    if (
      a.game_progress.status === "post" &&
      b.game_progress.status === "post"
    ) {
      return new Date(b.date) - new Date(a.date);
    }

    // live -> later period first
    if (a.game_progress.status === "in" && b.game_progress.status === "in") {
      return (b.game_progress.period || 0) - (a.game_progress.period || 0);
    }

    return 0;
  });
}

export function getFeaturedGames(eventsByLeague = [], limit = 12) {
  const normalizedGames = eventsByLeague.flatMap(({ league, events }) =>
    (events || []).map((event) => normalizeFeaturedEspnGame(event, league)),
  );

  return sortFeaturedGames(normalizedGames).slice(0, limit);
}

export function splitGamesByStatus(games = []) {
  return {
    inprogress: games.filter((game) => game.game_progress.status === "in"),
    upcoming: games.filter((game) => game.game_progress.status === "pre"),
    completed: games.filter((game) => game.game_progress.status === "post"),
  };
}
