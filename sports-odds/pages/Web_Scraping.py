#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
import re
import csv


def scrape_NBA ():
    page_to_scrape = requests.get('https://sports.yahoo.com/nba/odds/')


    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    # Specific html tags that are holding the information needed
    pregame = soup.findAll("span", {"class": "Lh(19px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )
    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    away_team_logo = []
    home_team_logo = []
    all_team_logos = []
    
    # Grabbing the image tags source so we can get the link to the teams logo
    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)

    # Putting all the logos into one list.
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    # Creating a condition to look for in regex.
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'


    file = open("Yahoo_Sports.csv", 'w', newline="")
    writer = csv.writer(file)

    # Creating the row headers in the file.
    writer.writerow(["Home_logo","Home_Team", "Home_Record", "Home_Money_line", "Home_Point_spread", "Home_Total_points", "Away_logo", "Away_Team", "Away_Record", "Away_Money_line", "Away_Point_spread", "Away_Total_points", "League"])

    team_1_money_line = []
    team_1_point_spread = []
    team_1_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    # Grabbing the moneyline, point spread, and total points.
    for odd in pregame:
        # Regex to find all strings that match the condition stated earlier, returns it in a list.
        fix_str = re.findall(reg_str, str(odd))
        # Checking to see if its an empty list
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

    # Extracting individual team name and their records and adding them to a list.
    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
    
    # Extracting individual point spread wager and total points wager and adding them to a list.
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

      
    # Putting all the teams info together for the home and away team.
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
    
    # Opening the same CSV file and appending new data.
   
        
    
        # Writing the home team and away team into the csv file.
        # The last line I had what league it is so when reading the data I can pull thr group I want if it matches the league.

    for h, a in zip(home_odds, away_odds):
        writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "NBA"])
        
    # closing the CSV File
    file.close()
  


def scrape_MLB ():
    page_to_scrape = requests.get('https://sports.yahoo.com/mlb/odds/')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    # Specific html tags that are holding the information needed
    pregame = soup.findAll("span", {"class": "Lh(19px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )
    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    away_team_logo = []
    home_team_logo = []
    all_team_logos = []
    
    # Grabbing the image tags source so we can get the link to the teams logo
    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)

    # Putting all the logos into one list.
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    # Creating a condition to look for in regex.
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'


    team_1_money_line = []
    team_1_point_spread = []
    team_1_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    # Grabbing the moneyline, point spread, and total points.
    for odd in pregame:
        # Regex to find all strings that match the condition stated earlier, returns it in a list.
        fix_str = re.findall(reg_str, str(odd))
        # Checking to see if its an empty list
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

    # Extracting individual team name and their records and adding them to a list.
    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
    
    # Extracting individual point spread wager and total points wager and adding them to a list.
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

      
    # Putting all the teams info together for the home and away team.
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
    
    # Opening the same CSV file and appending new data.
    with open("Yahoo_Sports.csv", "a", newline="") as file:
        writer = csv.writer(file)
        
    
        # Writing the home team and away team into the csv file.
        # The last line I had what league it is so when reading the data I can pull thr group I want if it matches the league.

        for h, a in zip(home_odds, away_odds):
            writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "MLB"])
        
    # closing the CSV File
    file.close()




def scrape_NHL ():
    page_to_scrape = requests.get('https://sports.yahoo.com/nhl/odds/')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    # Specific html tags that are holding the information needed.
    pregame = soup.findAll("span", {"class": "Lh(19px)"})
    teams = soup.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
    records = soup.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
    wager_odds = soup.findAll("span", {"class":"C($c-fuji-shark) Fw(400)! Pstart(4px) Lh(19px)"} )
    away_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
    home_div_tags  = soup.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )

    away_team_logo = []
    home_team_logo = []
    all_team_logos = []

    # Grabbing the image tags source so we can get the link to the teams logo. 
    for div_tag in away_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        away_team_logo.append(img_src)
    
    for div_tag in home_div_tags:
        img_tag = div_tag.find('img')
        img_src = img_tag['src']
        home_team_logo.append(img_src)

    # Putting all the logos into one list.
    for i in range(len(away_team_logo)):
        all_team_logos.append(away_team_logo[i])
        all_team_logos.append(home_team_logo[i])

    
    # Creating a condition to look for in regex.
    reg_str = "<" + "span" + ">(.*?)</" + "span" + '>'


    team_1_money_line = []
    team_1_point_spread = []
    team_1_total_points = []
    teams_list = []
    records_list = []
    pswager = []
    tpwager = []

    count = 0
    # Grabbing the moneyline, point spread, and total points. Used a brute force way of having them alternate.
    for odd in pregame:
        # Regex to find all strings that match the condition stated earlier, returns it in a list.
        fix_str = re.findall(reg_str, str(odd))

        # If the list is empty skip
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


    # Extracting individual team name and their records and adding them to a list.
    for team, record in zip(teams, records ):
        teams_list.append(team.text)
        records_list.append(record.text)
           
        
    
    # Extracting individual point spread wager and total points wager and adding them to a list.
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
    # Putting all the teams info together for the home and away team.
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
    
    
    # Opening the CSV file so I can add more data
    with open("Yahoo_Sports.csv", "a", newline="") as file:
        writer = csv.writer(file)
        
        # Writing the home team and away team into the csv file.
        # The last line I had what league it is so when reading the data I can pull the group I want if it matches the league.
        for h, a in zip(home_odds, away_odds):
            writer.writerow([h[0], h[1], h[2], h[3], h[4], h[5], a[0], a[1], a[2], a[3], a[4], a[5], "NHL"])
        
    # closing the CSV File
    file.close()

    

scrape_NBA()
scrape_NHL()
scrape_MLB()
