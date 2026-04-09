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
          division: "Conference",
          teams: sortTeamsByRecord(teams),
        },
      ],
    };
  });
}
