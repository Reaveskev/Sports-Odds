#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory, request, session
from flask_cors import CORS
from flask_mysqldb import MySQL
from bs4 import BeautifulSoup
import mysql.connector
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
import os
import dropbox
# import bcrypt


app = Flask(__name__, static_folder='./sports-odds/out')


app.debug = True
cors = CORS(app, support_credentials=True)
# Browser Driver




# Local do these 
# options = Options()
# options.add_argument("--headless")
# options.add_argument("--disable-dev-shm-usage")
# options.add_argument("--no-sandbox")
# driver = webdriver.Chrome(options=options)
# driver.execute_script("Intl.DateTimeFormat().resolvedOptions().timeZone = 'America/Los_Angeles';")



chrome_options = webdriver.ChromeOptions()
chrome_options.binary_location = os.environ.get("GOOGLE_CHROME_BIN")
chrome_options.add_argument("--headless")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--no-sandbox")


driver = webdriver.Chrome(executable_path=os.environ.get("CHROMEDRIVER_PATH"), chrome_options=chrome_options)



# MySql ####################

app.config['MYSQL_USER'] = os.environ.get('DB_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('DB_PASSWORD')
app.config['MYSQL_HOST'] = os.environ.get('DB_HOST')
app.config['MYSQL_DB'] = os.environ.get('DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['DROPBOX_ACCESS_TOKEN'] = os.environ.get('DROPBOX_ACCESS_TOKEN')


# app.config['MYSQL_USER'] = "root"
# app.config['MYSQL_PASSWORD'] = "Upshaw123!"
# app.config['MYSQL_HOST'] = "localhost"
# app.config['MYSQL_DB'] = "sports_odds"
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
# app.config['SECRET_KEY'] = 'mysecretkey'


mysql = MySQL(app)


@app.route("/", defaults={'path': ''})  
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/create_user', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        try:
            username = request.json['username']
            password = request.json['password']
            f_name = request.json['f_name']
            l_name = request.json['l_name']
            cursor = mysql.connection.cursor()
            cursor.execute('INSERT INTO user (username, password, f_name, l_name) VALUES (%s, %s, %s, %s)',(username, password, f_name, l_name ))
            mysql.connection.commit()
            cursor.execute('SELECT * FROM user WHERE username = %s AND password = %s', (username, password))
            user = cursor.fetchone()
            cursor.close()
            if user:
                 session['user_id'] = user['user_id']
                 print('Logged in successfully.', 'success')
                 return jsonify(user)
            else:
                return jsonify({'error': 'User not found'}), 401
        except Exception as e: print(e)
    else:
        return print("Creating user error")


####################
@app.route('/api/login_to_db', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            username = request.json['username']
            password = request.json['password']
             # Check if account exists using MySQL
            cursor = mysql.connection.cursor()
            cursor.execute('SELECT * FROM user WHERE username = %s AND password = %s', (username, password))
            # Fetch one record and return result
            
            user = cursor.fetchone()
            cursor.close()
            if user:
                 session['user_id'] = user['user_id']
                 print('Logged in successfully.', 'success')
                 return jsonify(user)
            else:
                return jsonify({'error': 'Invalid username or password'}), 401
           
        except Exception as e: print(e)
    else:
        return print("Please login")

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    print('Logged out successfully.', 'success')
    return jsonify({'success': 'Logged out successfully.'}), 200 

@app.route('/api/update_info', methods=['GET', 'POST'])
def update_info():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
    user = cur.fetchone()
    cur.close()
    if not user:
        return jsonify({"error":"User does not exist"}), 401
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        if not username or not password or not first_name or not last_name:
            return jsonify({"error":'All fields are required.'}), 401
        else:
            cur = mysql.connection.cursor()
            cur.execute('UPDATE user SET username = %s, password = %s, f_name = %s, l_name = %s WHERE user_id = %s', (username, password, first_name, last_name,  user_id))
            mysql.connection.commit()
            cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
            updated_user = cur.fetchone()
            cur.close()
            print('Profile updated successfully.', 'success')
            

    return jsonify(updated_user)


@app.route('/api/update_money', methods=['GET', 'POST'])
def update_money():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
    user = cur.fetchone()
    cur.close()
    if not user:
        return jsonify({"error":"User does not exist"}), 401
    if request.method == 'POST':

        fake_money = request.json['fake_money']
        cur = mysql.connection.cursor()
        cur.execute('UPDATE user SET fake_money = %s WHERE user_id = %s', (fake_money,  user_id))
        mysql.connection.commit()
        cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
        updated_user = cur.fetchone()
        cur.close()
        print('Profile fake money updated successfully.', 'success')
            

    return jsonify(updated_user)


@app.route('/api/update_image', methods=['GET', 'POST'])
def update_image():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
    user = cur.fetchone()
    cur.close()
    if not user:
        return jsonify({"error":"User does not exist"}), 401
    if request.method == 'POST':

        image = request.json['image']
        cur = mysql.connection.cursor()
        cur.execute('UPDATE user SET image = %s WHERE user_id = %s', (image,  user_id))
        mysql.connection.commit()
        cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
        updated_user = cur.fetchone()
        cur.close()
        print('Profile image updated successfully.', 'success')
            

    return jsonify(updated_user)

@app.route('/api/addBet', methods=['POST'])
def addBet():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        teams = request.json['teams']
        money_line = request.json.get('moneyline')
        money_line_team = request.json.get('moneyline_team')
        point_spread = request.json.get('pointSpread')
        total_points = request.json.get('totalPoints')
        game_date = request.json.get('gameDate')
        payout = request.json['parlayPayout']
        bet_amount = request.json['betAmount']
        league = request.json['league']
        sport = request.json['sport']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO bets (teams, money_line, money_line_team, point_spread, total_points, payout, bet_amount, game_date, league, sport, user_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',(teams, money_line, money_line_team, point_spread, total_points, payout, bet_amount, game_date, league, sport, user_id))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'success': 'Bet added successfully'}), 200
    
    except KeyError:
        return jsonify({'error': 'Missing required parameter(s)'}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to add bet'}), 500
   

@app.route('/api/seeBets', methods=['GET'])
def seeBets():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('Select * from bets WHERE user_id = %s',(user_id,))
        bets = cursor.fetchall()
        cursor.close()

        print('Retrieved all bets', 'success')
        return jsonify(bets)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to get bets'}), 500
    

@app.route('/api/addBetOutcome', methods=['POST'])
def addBetOutcome():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        money_line = request.json.get('money_line')
        point_spread = request.json.get('point_spread')
        total_points = request.json.get('total_points')
        payout = request.json['payout']
        bet_id = request.json['bet_id']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO bet_outcome (money_line, point_spread, total_points, payout, bet_id , user_id) VALUES (%s, %s, %s, %s, %s, %s)',(money_line, point_spread, total_points, payout, bet_id , user_id))
        mysql.connection.commit()
        cursor.close()

        return jsonify({'success': 'Bet updated successfully'}), 200
    
    except KeyError:
        return jsonify({'error': 'Missing required parameter(s)'}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to update bet'}), 500
   

@app.route('/api/seeBetsOutcome', methods=['GET'])
def seeBetsOutcome():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('Select * from bet_outcome WHERE user_id = %s',(user_id,))
        bets = cursor.fetchall()
        cursor.close()

        print('Retrieved all bet outcomes', 'success')
        return jsonify(bets)
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to get bet outcomes'}), 500


@app.errorhandler(404)  
def not_found(err):  
    return app.send_static_file('404.html')

@app.route('/api/addTransaction', methods=['POST'])
def addTransaction():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        date = request.json.get('date')
        transaction_type = request.json.get('transaction_type')
        transaction_amount = request.json.get('transaction_amount')
        money_in_account = request.json['money_in_account']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO transactions (date, transaction_type, transaction_amount, money_in_account , user_id) VALUES (%s, %s, %s, %s, %s)',(date, transaction_type, transaction_amount, money_in_account , user_id))
        mysql.connection.commit()
        cursor.execute('select * from transactions where user_id = %s',(user_id,))
        transactions = cursor.fetchall()
        cursor.close()

        print('Retrieved all transactions', 'success')
        return jsonify(transactions)

        
    
    except KeyError:
        return jsonify({'error': 'Missing required parameter(s)'}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to update bet'}), 500
    
@app.route('/api/getTransaction', methods=['GET'])
def getTransaction():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({"error":"Need user id"}), 401
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('select * from transactions where user_id = %s',(user_id,))
        transactions = cursor.fetchall()
        cursor.close()

        print('Retrieved all transactions', 'success')
        return jsonify(transactions)
    
    except KeyError:
        return jsonify({'error': 'Missing required parameter(s)'}), 400
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Failed to retrieve transactions'}), 500



@app.route('/api/Sport_News/<sport>')
def scrape_News(sport):
    sports = ["mlb", "nhl", "ncaa-basketball", "nba", "nfl", "ncaa-football", "wnba", "soccer"]
    if sport not in sports:
        return jsonify({'error': 'Input a valid sports league'}), 400
        
    
    url = 'https://www.sportingnews.com/us/{}/news'.format(sport)

    
    page_to_scrape = requests.get(url)

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    news_div = soup.findAll("div", {"class":"list-item"})

    news_list =[]

    for i, news in zip(range(8),news_div):
        headline_tag = news.find("span", {"class":"rdf-meta hidden"})
        headline = headline_tag['content'] + "."
        picture = news.find('picture')
        img_tag = picture.find('img')
        img = img_tag['src']
        description_div = news.find("div", {"class": "list-item__title"})
        description = description_div.find("a").text + "."
        url = "https://www.sportingnews.com" + description_div.find("a")["href"]
        soccer_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(soccer_news)
        
        
    return jsonify(news_list)



@app.route('/api/dropbox/upload', methods=['POST'])
def dropbox_upload():
    try:
        dbx = dropbox.Dropbox(app.config['DROPBOX_ACCESS_TOKEN'])
        file = request.files['file']
        filename = file.filename
        file_bytes = file.read()
        response = dbx.files_upload(file_bytes, f"/{filename}", mode=dropbox.files.WriteMode.overwrite)
        shared_link = dbx.sharing_create_shared_link_with_settings(response.path_display)
        return jsonify({'url': shared_link.url})
    
    except dropbox.exceptions.AuthError:
        return jsonify({'error': 'Invalid Dropbox access token'})
    
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/Odds/<league>')
def scrape_Odds(league):
    sport = ["mlb", "nhl", "college-basketball", "nba", "nfl", "college-football", "wnba"]
    if league not in sport:
        return jsonify({'error': 'Input a valid sports league'}), 400

    url = 'https://sports.yahoo.com/{}/odds/'.format(league)


    driver.get(url)
    wait = WebDriverWait(driver, 5)
    

  
    try:
        parent_elem = wait.until(EC.presence_of_element_located((By.XPATH, '//span[@class="Fz(14px) smartphone_Fz(12px) C(#828c93)"]')))
    except:
        Upcoming = {}
        Inprogress = {}
        Final = {}
        return jsonify(Upcoming,Inprogress,Final)

 
    html = driver.page_source 

    # page_to_scrape = requests.get(url)

    # soup = BeautifulSoup(page_to_scrape.text, "html.parser")
    soup = BeautifulSoup(html, "html.parser")

    upcoming_games = []


    inprogress_away_team_logo = []
    inprogress_home_team_logo = []
    inprogress_team_1_money_line = []
    inprogress_team_1_point_spread = []
    inprogress_team_1_point_spread_odd = []
    inprogress_team_1_total_points = []
    inprogress_team_1_total_points_odd = []
    inprogress_teams_list = []
    inprogress_score_list = []
    inprogress_all_team_logos = []
    inprogress_home_odds = []
    inprogress_away_odds = []
    inprogress_games = []


    final_away_team_logo = []
    final_home_team_logo = []
    final_team_1_money_line = []
    final_team_1_point_spread = []
    final_team_1_total_points = []
    final_teams_list = []
    final_score_list = []
    final_all_team_logos = []
    final_home_odds = []
    final_away_odds = []
    final_games = []



    final_div = soup.findAll('div', class_=lambda c: c and 'FINAL' in c)
    inprogress_div = soup.findAll('div', class_=lambda c: c and 'IN_PROGRESS' in c)
    pregame_div = soup.findAll('div', class_=lambda c: c and 'PREGAME' in c)

    for x in final_div:
        final_teams = x.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
        final_score = x.findAll("span",{"class":"Fw(800) D(n) D(ib)!--medPhone Fl(end) Maw(30px) Pend(12px)"} )
        final_odds = x.findAll("span", {"class":"Lh(19px)"} )
        final_away_div_tags  = x.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
        final_home_div_tags  = x.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )
        
        final_away_team_logo = []
        final_home_team_logo = []
        final_team_1_money_line = []
        final_team_1_point_spread = []
        final_team_1_total_points = []
        final_teams_list = []
        final_score_list = []
        final_all_team_logos = []
        final_home_odds = []
        final_away_odds = []


        for div_tag in final_away_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            final_away_team_logo.append(img_src)
    
        for div_tag in final_home_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            final_home_team_logo.append(img_src)

        

        for i in range(len(final_away_team_logo)):
            final_all_team_logos.append(final_away_team_logo[i])
            final_all_team_logos.append(final_home_team_logo[i])


        count = 0
        for soup in final_odds:
            count += 1
            for span in soup.find_all('span'):
                if count == 1:
                    if span.find_previous_sibling('img', {'alt': 'correct'}) and 'correct' in span.find_previous_sibling('img', {'alt': 'correct'}).get('alt'):
                        final_team_1_money_line.append("True " + span.text)
                    else:
                        final_team_1_money_line.append(span.text)
                elif count == 2:
                    if span.find_previous_sibling('img', {'alt': 'correct'}) and 'correct' in span.find_previous_sibling('img', {'alt': 'correct'}).get('alt'):
                        final_team_1_point_spread.append("True " + span.text)
                    else:
                        final_team_1_point_spread.append(span.text)
                elif count == 3:
                    count = 0
                    if span.find_previous_sibling('img', {'alt': 'correct'}) and 'correct' in span.find_previous_sibling('img', {'alt': 'correct'}).get('alt'):
                        final_team_1_total_points.append("True " + span.text)
                    else:
                        final_team_1_total_points.append(span.text)
        
        for team, record in zip(final_teams, final_score ):
            final_teams_list.append(team.text)
            final_score_list.append(record.text)

        


        counter = 0
        for l, t, s, m1, p1, t1 in zip(final_all_team_logos, final_teams_list, final_score_list, final_team_1_money_line, final_team_1_point_spread, final_team_1_total_points):
            if((counter % 2) == 0):
                final_away_odds.append([l, t, s, m1, p1, t1])
                counter += 1
            else:
                final_home_odds.append([l, t, s, m1, p1, t1])
                counter += 1

        
        for i in range(len(final_away_odds)):
            game = {}
            game['home'] = {"team" : final_home_odds[i][1], "logo": final_home_odds[i][0], "score":  final_home_odds[i][2], "moneyline":  final_home_odds[i][3], 'point_spread': final_home_odds[i][4],  'total_points': final_home_odds[i][5]  }
            game['away'] = {"team" : final_away_odds[i][1], "logo": final_away_odds[i][0], "score":  final_away_odds[i][2], "moneyline":  final_away_odds[i][3], 'point_spread': final_away_odds[i][4],  'total_points': final_away_odds[i][5] }
       
            final_games.append(game)

    #####################
    
    for x in inprogress_div:
        inprogress_teams = x.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
        inprogress_score = x.findAll("span",{"class":"Fw(800) D(n) D(ib)!--medPhone Fl(end) Maw(30px) Pend(12px)"} )
        inprogress_odds = x.findAll("span", {"class":"Lh(19px)"} )
        inprogress_away_div_tags  = x.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
        inprogress_home_div_tags  = x.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )
        inprogress_time_span = x.find_all("span", {"class":"C(#6d7278) Fz(14px) smartphone_Fz(12px)"})
        
        inprogress_away_team_logo = []
        inprogress_home_team_logo = []
        inprogress_team_1_money_line = []
        inprogress_team_1_point_spread = []
        inprogress_team_1_point_spread_odd = []
        inprogress_team_1_total_points = []
        inprogress_team_1_total_points_odd = []
        inprogress_teams_list = []
        inprogress_score_list = []
        inprogress_all_team_logos = []
        inprogress_home_odds = []
        inprogress_away_odds = []
        inprogress_time = []



        if inprogress_time_span:
            for start in inprogress_time_span:
                inprogress_time.append(start.text)
                inprogress_time.append(start.text)
        
    

        for div_tag in inprogress_away_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            inprogress_away_team_logo.append(img_src)
    
        for div_tag in inprogress_home_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            inprogress_home_team_logo.append(img_src)

        

        for i in range(len(inprogress_away_team_logo)):
            inprogress_all_team_logos.append(inprogress_away_team_logo[i])
            inprogress_all_team_logos.append(inprogress_home_team_logo[i])

        
        count = 0
        for soup in inprogress_odds:
            count += 1
            if count == 1:
                    inprogress_team_1_money_line.append(soup.text)
            elif count == 2:
                    inprogress_team_1_point_spread.append(soup.text)
            elif count == 3:        
                    inprogress_team_1_point_spread_odd.append(soup.text)
            elif count == 4:
                    inprogress_team_1_total_points.append(soup.text)
            elif count == 5:
                    count = 0
                    inprogress_team_1_total_points_odd.append(soup.text)
            
        
        for team, record in zip(inprogress_teams, inprogress_score ):
            inprogress_teams_list.append(team.text)
            inprogress_score_list.append(record.text)

        

       
        counter = 0
        for l, t, s, m1, p1, ps, t1, ts, time in zip(inprogress_all_team_logos, inprogress_teams_list, inprogress_score_list, inprogress_team_1_money_line, inprogress_team_1_point_spread, inprogress_team_1_point_spread_odd, inprogress_team_1_total_points, inprogress_team_1_total_points_odd, inprogress_time):
            if((counter % 2) == 0):
                with_odds_p = p1 + ' ({})'.format(ps)
                with_odds_t = t1 + ' ({})'.format(ts)
                inprogress_away_odds.append([l, t, s, m1, with_odds_p, with_odds_t, time])
                counter += 1
            else:
                with_odds_p = p1 + ' ({})'.format(ps)
                with_odds_t = t1 + ' ({})'.format(ts)
                inprogress_home_odds.append([l, t, s, m1, with_odds_p, with_odds_t, time])
                counter += 1

       
        
        for h, a in zip(inprogress_home_odds, inprogress_away_odds):
            
            ingames = {}
            ingames['home'] = {"team" : h[1], "logo": h[0], "score":  h[2], "moneyline":  h[3], 'point_spread': h[4],  'total_points': h[5], 'time_left': h[6]}
            ingames['away'] = {"team" : a[1], "logo": a[0], "score":  a[2], "moneyline":  a[3], 'point_spread': a[4],  'total_points': a[5], 'time_left': a[6]}
            
            inprogress_games.append(ingames)


    
    for div in pregame_div: 
        upcoming_teams = div.findAll("span",{"class":"Fw(600) Pend(4px) Ell D(ib) Maw(190px) Va(m)"} )
        upcoming_record = div.findAll("span",{"class":"C(dimmed-text) Fz(12px)"} )
        upcoming_odds = div.findAll("span", {"class":"Lh(19px)"} )
        upcoming_away_div_tags  = div.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-away-team"} )
        upcoming_home_div_tags  = div.findAll("div", {"class":"Fz(14px) Lh(30px) C($c-fuji-grey-m) sixpack-home-team"} )
        upcoming_start_elem = div.find('span', {'class': 'Fz(14px) smartphone_Fz(12px) C(#828c93)'})
        if upcoming_start_elem:
            if(upcoming_start_elem.find_all('span')[1]):
                upcoming_start = upcoming_start_elem.find_all('span')[1]
            else:
                break  
        else:
            break
        
        
        upcoming_away_team_logo = []
        upcoming_home_team_logo = []
        upcoming_team_1_money_line = []
        upcoming_team_1_point_spread = []
        upcoming_team_1_point_spread_odd = []
        upcoming_team_1_total_points = []
        upcoming_team_1_total_points_odd = []
        upcoming_teams_list = []
        upcoming_all_team_logos = []
        upcoming_home_odds = []
        upcoming_away_odds = []
        upcoming_records_list = []
        upcoming_start_time = []

        if upcoming_start:
            for start in upcoming_start:
                upcoming_start_time.append(start.text)
                upcoming_start_time.append(start.text)
                
        


        for div_tag in upcoming_away_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            upcoming_away_team_logo.append(img_src)

        for div_tag in upcoming_home_div_tags:
            img_tag = div_tag.find('img')
            img_src = img_tag['src']
            upcoming_home_team_logo.append(img_src)

        for i in range(len(upcoming_away_team_logo)):
            upcoming_all_team_logos.append(upcoming_away_team_logo[i])
            upcoming_all_team_logos.append(upcoming_home_team_logo[i])
        count = 0

        for soup in upcoming_odds:
            count += 1
            if count == 1:
                upcoming_team_1_money_line.append(soup.text)
            elif count == 2:
                upcoming_team_1_point_spread.append(soup.text)
            elif count == 3:        
                upcoming_team_1_point_spread_odd.append(soup.text)
            elif count == 4:
                upcoming_team_1_total_points.append(soup.text)
            elif count == 5:
                count = 0
                upcoming_team_1_total_points_odd.append(soup.text)
        for team, record in zip(upcoming_teams, upcoming_record ):
            upcoming_teams_list.append(team.text)
            upcoming_records_list.append(record.text)

        counter = 0
        
        for l, t, s, m1, p1, ps, t1, ts, time in zip(upcoming_all_team_logos, upcoming_teams_list, upcoming_records_list, upcoming_team_1_money_line, upcoming_team_1_point_spread, upcoming_team_1_point_spread_odd, upcoming_team_1_total_points, upcoming_team_1_total_points_odd, upcoming_start_time):
            if((counter % 2) == 0):
                with_odds_p = p1 + ' ({})'.format(ps)
                with_odds_t = t1 + ' ({})'.format(ts)
                upcoming_away_odds.append([l, t, s, m1, with_odds_p, with_odds_t, time])
                counter += 1
            else:
                with_odds_p = p1 + ' ({})'.format(ps)
                with_odds_t = t1 + ' ({})'.format(ts)
                upcoming_home_odds.append([l, t, s, m1, with_odds_p, with_odds_t, time])
                counter += 1
        

        games = {}
        for h, a in zip(upcoming_home_odds, upcoming_away_odds):
            games['home'] = {"team" : h[1], "logo": h[0], "record":  h[2], "moneyline":  h[3], 'point_spread': h[4],  'total_points': h[5], 'start_time': h[6]}
            games['away'] = {"team" : a[1], "logo": a[0], "record":  a[2], "moneyline":  a[3], 'point_spread': a[4],  'total_points': a[5], 'start_time': a[6]}
            upcoming_games.append(games)
       

    # driver.quit()
    print("The driver has been closed")
    Upcoming = {}
    Upcoming["Upcoming"] = upcoming_games
    Inprogress = {}
    Inprogress["Inprogress"] = inprogress_games
    Final = {}
    Final["Final"] = final_games
    
    
    return jsonify(Upcoming,Inprogress,Final)


@app.route('/api/Sport_Standings/<sport>')
def scrape_Standing(sport):
    sports = ["mlb", "nhl", "ncaa-basketball", "nba", "nfl", "ncaa-football", "wnba", "soccer"]
    if sport not in sports:
        return jsonify({'error': 'Input a valid sports league'}), 400
        
    if sport == "mlb":
        url = "https://sports.yahoo.com/mlb/standings/?selectedTab=EXPANDED"
    elif sport == "nfl":
        url = "https://sports.yahoo.com/nfl/standings/?selectedTab=PLAYOFFS"
    elif sport == "nhl":
        url = "https://sports.yahoo.com/nhl/standings/?selectedTab=CONFERENCE"
    else:
        url = 'https://sports.yahoo.com/{}/standings/'.format(sport)

    
    page_to_scrape = requests.get(url)

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    standings_data = []
    standings_div = soup.findAll('table', {"class":'W(100%) Mb(20px)'})
    
    for x in standings_div:
        conference = x.find("th",{"class":"Py(6px) Px(4px) Ta(end) Ta(start)!"} ).text
        tbody =  x.find("tbody")
        rows = tbody.find_all('tr')
        
        standings = []
        
        for row in rows:
            spans = row.findAll("span")
            if spans[0].find("img")['src'] != 'https://s.yimg.com/g/images/spaceball.gif':
                img = spans[0].find("img")["src"]
            else:
                img = spans[0].find("img")["style"]
            img_url = img.split('background-image:url(')[-1].split(')')[0]
            champ_odds = spans[-1].text
            team_name = spans[1].text
            td = row.findAll("td")
            if sport == "nhl":
                wins = td[1].text
                losses = td[2].text
            else:
                wins = td[0].text
                losses = td[1].text
            team_info = {"logo": img_url,
                         "team_name": team_name,
                         "wins": wins,
                         "losses": losses,
                         "championship_odds": champ_odds }
            standings.append(team_info)
            
        conference_data = {"conference": conference, "teams": standings}
        standings_data.append(conference_data)
            
    return jsonify(standings_data)
 



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(DEBUG="True",host='0.0.0.0', port=port)