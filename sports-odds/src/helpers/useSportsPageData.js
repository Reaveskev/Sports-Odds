import { useEffect, useState } from "react";
import axios from "axios";
import {
  groupGamesByStatus,
  combineNewsSources,
} from "@/src/helpers/sportsPageHelpers";

export default function useSportsPageData({
  scoreboardUrl,
  espnNewsUrl,
  customNewsUrl,
  standingsUrl,
}) {
  const [loading, setLoading] = useState(true);
  const [upcoming, setUpcoming] = useState([]);
  const [inprogress, setInprogress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [news, setNews] = useState([]);
  const [standings, setStandings] = useState([]);
  const [offseason, setOffseason] = useState(false);

  useEffect(() => {
    async function loadPageData() {
      try {
        const [scoreboardRes, espnNewsRes, customNewsRes, standingsRes] =
          await Promise.all([
            axios.get(scoreboardUrl),
            axios.get(espnNewsUrl),
            axios.get(customNewsUrl),
            axios.get(standingsUrl),
          ]);

        const events = scoreboardRes.data?.events || [];
        const groupedGames = groupGamesByStatus(events);

        setUpcoming(groupedGames.upcoming);
        setInprogress(groupedGames.inprogress);
        setCompleted(groupedGames.completed);

        const combinedNews = combineNewsSources(
          espnNewsRes.data?.articles || [],
          customNewsRes.data || [],
        );

        setNews(combinedNews);
        setStandings(standingsRes.data || []);

        if (events.length === 0) {
          setOffseason(true);
        } else {
          setOffseason(false);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to load sports page data:", error);
        setLoading(false);
      }
    }

    loadPageData();
  }, [scoreboardUrl, espnNewsUrl, customNewsUrl, standingsUrl]);

  return {
    loading,
    upcoming,
    inprogress,
    completed,
    news,
    standings,
    offseason,
  };
}
