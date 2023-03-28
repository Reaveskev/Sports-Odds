#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
import re
import csv


def scrape_NBA ():
    page_to_scrape = requests.get('https://sports.yahoo.com/nba/odds/')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    odds = soup.findAll("div", {"class":"D(f) Jc(sb) Fz(12px) Fw(600) Mb(8px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )

    away_team_logo = []
    home_team_logo = []

    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)
    
    all_team_logos = []
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'

    file = open("Yahoo_Sports.csv", 'w', newline="")
    writer = csv.writer(file)

    
    writer.writerow(["Home_logo","Home_Team", "Home_Record", "Home_Money_line", "Home_Point_spread", "Home_Total_points", "Away_logo", "Away_Team", "Away_Record", "Away_Money_line", "Away_Point_spread", "Away_Total_points", "League"])
  
    money = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55, 58, 61, 64, 67, 70, 73]
    spread = [2, 5, 8, 11, 14, 17 ,20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68, 71, 74]

    team_1_money_line = []
    team_2_money_line = []
    team_1_point_spread = []
    team_2_point_spread = []
    team_1_total_points = []
    team_2_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    for odd in odds:
        count += 1
        fix_str = re.findall(reg_str, str(odd))
        
        del fix_str[1]
        
        if money.count(count):
            team_1_money_line.append(fix_str[0])
            team_2_money_line.append(fix_str[1])
        elif spread.count(count):
            team_1_point_spread.append(fix_str[0])
            team_2_point_spread.append(fix_str[1])
        else:
            team_1_total_points.append(fix_str[0])
            team_2_total_points.append(fix_str[1])


    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
        

    another_count = 0
    for wo in wager_odds:
        if((another_count % 2) == 0):
            pswager.append(wo.text)
            another_count += 1
        else:
            tpwager.append(wo.text)
            another_count += 1


    home_odds = []
    away_odds = []



    counter = 0
    for l, t, r, m1, m2, p1, p2, ps, t1, t2, tp in zip(all_team_logos, teams_list, records_list, team_1_money_line, team_2_money_line, team_1_point_spread, team_2_point_spread, pswager, team_1_total_points, team_2_total_points, tpwager):
        if((counter % 2) == 0):
            with_odds_p = p1 + ' ({})'.format(ps)
            with_odds_t = t1 + ' ({})'.format(tp)
            away_odds.append([l, t, r, m1, with_odds_p, with_odds_t])
            counter += 1
        else:
            with_odds_p = p2 + ' ({})'.format(ps)
            with_odds_t = t2 + ' ({})'.format(tp)
            home_odds.append([l, t, r, m2, with_odds_p, with_odds_t])
            counter += 1
    

    for h, a in zip(home_odds, away_odds):
        writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "NBA"])
        

    file.close()
    







def scrape_MLB ():
    page_to_scrape = requests.get('https://sports.yahoo.com/mlb/odds/')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    pregame = soup.findAll("span", {"class": "Lh(19px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )

    away_team_logo = []

    home_team_logo = []

    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)

    all_team_logos = []
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'


    team_1_money_line = []
    team_1_point_spread = []
    team_1_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    for odd in pregame:
        
        fix_str = re.findall(reg_str, str(odd))
        if fix_str == []:
            continue
        
        stri = fix_str[0]
        count += 1
        
        if count == 1:
            team_1_money_line.append(stri)
        elif count == 2:
            team_1_point_spread.append(stri)
        elif count == 3:
            team_1_total_points.append(stri)
            count = 0


    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
    

    another_count = 0
    for wo in wager_odds:
        if((another_count % 2) == 0):
            pswager.append(wo.text)
            another_count += 1
        else:
            tpwager.append(wo.text)
            another_count += 1


    home_odds = []
    away_odds = []

      

    counter = 0
    for l, t, r, m1, p1, ps, t1, tp in zip(all_team_logos, teams_list, records_list, team_1_money_line, team_1_point_spread, pswager, team_1_total_points, tpwager):
        if((counter % 2) == 0):
            with_odds_p = p1 + ' ({})'.format(ps)
            with_odds_t = t1 + ' ({})'.format(tp)
            away_odds.append([l, t, r, m1, with_odds_p, with_odds_t])
            counter += 1
        else:
            with_odds_p = p1 + ' ({})'.format(ps)
            with_odds_t = t1 + ' ({})'.format(tp)
            home_odds.append([l, t, r, m1, with_odds_p, with_odds_t])
            counter += 1
    
    with open("Yahoo_Sports.csv", "a", newline="") as file:
        writer = csv.writer(file)
        
    

        for h, a in zip(home_odds, away_odds):
            writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "MLB"])
        

    file.close()




def scrape_NHL ():
    page_to_scrape = requests.get('https://sports.yahoo.com/nhl/odds/')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    pregame = soup.findAll("span", {"class": "Lh(19px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )

    away_team_logo = []
    home_team_logo = []

    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)

    all_team_logos = []
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'


    team_1_money_line = []
    team_1_point_spread = []
    team_1_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    for odd in pregame:
        
        fix_str = re.findall(reg_str, str(odd))
        if fix_str == []:
            continue
        
        stri = fix_str[0]
        count += 1
        
        if count == 1:
            team_1_money_line.append(stri)
        elif count == 2:
            team_1_point_spread.append(stri)
        elif count == 3:
            team_1_total_points.append(stri)
            count = 0



    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
    

    another_count = 0
    for wo in wager_odds:
        if((another_count % 2) == 0):
            pswager.append(wo.text)
            another_count += 1
        else:
            tpwager.append(wo.text)
            another_count += 1


    home_odds = []
    away_odds = []

      

    counter = 0
    for l, t, r, m1, p1, ps, t1, tp in zip(all_team_logos, teams_list, records_list, team_1_money_line, team_1_point_spread, pswager, team_1_total_points, tpwager):
        if((counter % 2) == 0):
            with_odds_p = p1 + ' ({})'.format(ps)
            with_odds_t = t1 + ' ({})'.format(tp)
            away_odds.append([l, t, r, m1, with_odds_p, with_odds_t])
            counter += 1
        else:
            with_odds_p = p1 + ' ({})'.format(ps)
            with_odds_t = t1 + ' ({})'.format(tp)
            home_odds.append([l, t, r, m1, with_odds_p, with_odds_t])
            counter += 1
    
    with open("Yahoo_Sports.csv", "a", newline="") as file:
        writer = csv.writer(file)
        
    
        for h, a in zip(home_odds, away_odds):
            writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "NHL"])
        

    file.close()

    


# def test():
#     unwanted = ["points", "% of Bets", "goals", "runs"]
    

#     page_to_scrape = requests.get('https://sports.yahoo.com/mlb/odds/')

#     soup = BeautifulSoup(page_to_scrape.text, "html.parser")
    # Parse the HTML content with BeautifulSoup
    
    # pregame = soup.find("div", {"class": "Fxg(1)"})
    # pregame = soup.findAll("span", {"class": "Lh(19px)"})
    # print(pregame)

    # tables = soup.findAll("tbody")

    # for table in tables:
    #     for row in table.findAll("td"):
    #         for span in row.findAll('span'):
    #             if span.text not in unwanted:
    #                 if len(span.text) < 25:
    #                         td.append(span.text)
                    
    

    # size = 20
    # smaller_lists = [td[i:i+size] for i in range(0, len(td), size)]
    # print(smaller_lists[0])


    # for inner_list in smaller_lists:
    #     for index, item in enumerate(inner_list):
    #         print("Index:", index, "Value:", item)

    

            
        



# test() 
scrape_NBA()
scrape_NHL()
scrape_MLB()
