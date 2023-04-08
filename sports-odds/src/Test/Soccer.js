// import axios from "axios";
// import { useState, useEffect } from "react";
// import styles from "@/styles/NBA.module.css";
// import Header from "@/src/Header";

// function Soccer() {
//   const [loading, setLoading] = useState(true);
//   const [completed, setCompleted] = useState([]);
//   const [inprogress, setInprogress] = useState([]);
//   const [upcoming, setUpcoming] = useState([]);
//   const [SoccerNews, setSoccerNews] = useState([]);
//   const [SoccerNews2, setSoccerNews2] = useState([]);
//   const [offseason, setoffseason] = useState(false);

//////
//  They need to be separated by league and then grouped by upcoming, inprogress and completed.
//////

// useEffect(() => {
//   axios
//     .get(
//       "https://statmilk.bleacherreport.com/api/scores/carousel?league=SOCCER&team=none&carousel_context=league&tz=-25200&appversion=500.0"
//     )
//     .then((res) => {
//       console.log(res.data);
//       if (res.data.game_groups[0] === undefined) {
//         setoffseason(true);
//       } else if (res.data.game_groups[0].name === "Friendlies") {
//         setInprogress(res.data.game_groups[0]);
//         setCompleted(res.data.game_groups[1]);
//         setUpcoming(res.data.game_groups[2]);
//       } else if (res.data.game_groups[0].name === "European Qualifiers") {
//         setCompleted(res.data.game_groups[0]);
//         setUpcoming(res.data.game_groups[1]);
//       } else {
//         setUpcoming(res.data.game_groups[0]);
//       }
//     });
// .then(() => {
//   axios
//     .get(
//       "https://site.api.espn.com/apis/site/v2/sports/soccer/:league/news"
//     )
//     .then((res) => {
//       setSoccerNews(res.data.articles);
//       setLoading(false);
//     });
// }).then(() => {
//     axios
//     .get(
//       // "https://sports-odds.herokuapp.com/SOCCER_NEWS" ||
//       "http://127.0.0.1:5000/SOCCER_NEWS"
//     )
//     .then((res) => {
//       setSoccerNews2(res.data);
//     });
// });
// }, []);

// return (
//   <div>
//     <Header />
//     <div>Todo at Later date</div>
//   </div>
//    <div
//         className={styles.scoreboard}
//         style={offseason ? { justifyContent: "center" } : null}
//       >
//         {loading ? (
//           <>
//             <p>Data is loading...</p>
//           </>
//         ) : (
//           <>
//             {offseason ? (
//               <div className={styles.offseason}>
//                 <p>It is currently the offseason.</p>
//               </div>
//             ) : (
//               <>
//                 {inprogress.game_groups !== undefined ? (
//                   <>
//                     {inprogress.games.map((games) => {
//                       return (
//                         <div className={styles.games} key={games.id}>
//                           <div className={styles.date}>
//                             {games.game_progress.primary}
//                           </div>
//                           <div className={styles.time}>
//                             {games.game_progress.header}
//                           </div>
//                           <div className={styles.teamContainer}>
//                             <div className={styles.logoDiv}>
//                               <img
//  alt=''
//                                 className={styles.logo}
//                                 src={games.team_one.logo}
//                               />
//                             </div>
//                             <div className={styles.teamName}>
//                               {games.team_one.abbrev}
//                             </div>
//                             <div className={styles.record}>
//                               {games.team_one.record}
//                             </div>
//                             <span>{games.team_one.score}</span>
//                           </div>
//                           <div className={styles.teamContainer}>
//                             <div className={styles.logoDiv}>
//                               <img
//  alt=''
//                                 className={styles.logo}
//                                 src={games.team_two.logo}
//                               />
//                             </div>
//                             <div className={styles.teamName}>
//                               {games.team_two.abbrev}
//                             </div>
//                             <div className={styles.record}>
//                               {games.team_two.record}
//                             </div>
//                             <span>{games.team_one.score}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : null}
//                 {completed.games !== undefined ? (
//                   <>
//                     {completed.games.map((games) => {
//                       return (
//                         <div className={styles.games} key={games.id}>
//                           <div className={styles.date}>
//                             {games.game_progress.primary}
//                           </div>
//                           <div className={styles.time}>
//                             {games.game_progress.header}
//                           </div>
//                           <div className={styles.teamContainer}>
//                             <div className={styles.logoDiv}>
//                               <img
//  alt=''
//                                 className={styles.logo}
//                                 src={games.team_one.logo}
//                               />
//                             </div>
//                             <div className={styles.teamName}>
//                               {games.team_one.abbrev}
//                             </div>
//                             <div className={styles.record}>
//                               {games.team_one.record}
//                             </div>
//                             <span>{games.team_one.score}</span>
//                           </div>
//                           <div className={styles.teamContainer}>
//                             <div className={styles.logoDiv}>
//                               <img
//  alt=''
//                                 className={styles.logo}
//                                 src={games.team_two.logo}
//                               />
//                             </div>
//                             <div className={styles.teamName}>
//                               {games.team_two.abbrev}
//                             </div>
//                             <div className={styles.record}>
//                               {games.team_two.record}
//                             </div>
//                             <span>{games.team_one.score}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : null}
//                 {upcoming.games.map((games) => {
//                   return (
//                     <div className={styles.games} key={games.id}>
//                       <div className={styles.date}>
//                         {games.game_progress.primary}
//                       </div>
//                       <div className={styles.time}>
//                         {games.game_progress.header}
//                       </div>
//                       <div className={styles.teamContainer}>
//                         <div className={styles.logoDiv}>
//                           <img
//  alt=''
//                             className={styles.logo}
//                             src={games.team_one.logo}
//                           />
//                         </div>
//                         <div className={styles.teamName}>
//                           {games.team_one.abbrev}
//                         </div>
//                         <div className={styles.record}>
//                           {games.team_one.record}
//                         </div>
//                         <span>{games.team_one.score}</span>
//                       </div>
//                       <div className={styles.teamContainer}>
//                         <div className={styles.logoDiv}>
//                           <img
//  alt=''
//                             className={styles.logo}
//                             src={games.team_two.logo}
//                           />
//                         </div>
//                         <div className={styles.teamName}>
//                           {games.team_two.abbrev}
//                         </div>
//                         <div className={styles.record}>
//                           {games.team_two.record}
//                         </div>
//                         <span>{games.team_one.score}</span>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </>
//             )}
//           </>
//         )}
//       </div>

//       <div className={styles.news}>
//         <header className="newsHeader">Soccer News</header>
//         {SoccerNews.map((news) => {
//           return (
//             <div className={styles.newInfo} key={news.headline}>
//               <header>{news.headline}</header>
//               <a href={news.links.web.href}>
//                 <img
//                   className={styles.Pic}
// height={325}
// width={575}
//                    alt=''
//                   src={news.images[0].url}
//                 />
//               </a>
//               <p>{news.description}</p>
//             </div>
//           );
//         })}
// {SoccerNews2.map((news) => {
//   return (
//     <div className={styles.newInfo} key={news.headline}>
//       <header>{news.headline}</header>
//       <a href={news.links}>
//         <img
//           className={styles.Pic}
// height={325}
// width={575}
//            alt=''
//           src={news.image}
//         />
//       </a>
//       <p>{news.description}</p>
//     </div>
//   );
// })}
//       </div>
// </div>
//   );
// }

// export default Soccer;
