#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory, request, session
from flask_cors import CORS
from flask_mysqldb import MySQL
from werkzeug.security import generate_password_hash, check_password_hash
from bs4 import BeautifulSoup
import mysql.connector
# from dotenv import load_dotenv
# import MySQLdb.cursors
import requests
import os
# import bcrypt

# load_dotenv()

app = Flask(__name__, static_folder='./sports-odds/out')


app.debug = True
cors = CORS(app, support_credentials=True)


# MySql ####################

app.config['MYSQL_USER'] = os.environ.get('DB_USER')
app.config['MYSQL_PASSWORD'] = os.environ.get('DB_PASSWORD')
app.config['MYSQL_HOST'] = os.environ.get('DB_HOST')
app.config['MYSQL_DB'] = os.environ.get('DB')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

# app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
# app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
# app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
# app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')
# app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

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
        # try:
        # # Test the database connection by querying a table
        #     cursor = mysql.connection.cursor()
        #     cursor.execute('''SELECT * FROM user''')
        #     result = cursor.fetchall()
        #     cursor.close()
        #     if result != "":
        #         print(result)
        #     else:
        #         print( 'The database is empty.')
        # except Exception as e:
        #     print(f'Database connection error: {str(e)}')
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    
####################
@app.route('/login_to_db', methods=['GET', 'POST'])
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
            # If account exists in accounts table in our database
            # if user:
            #     return jsonify(user) 
            # else:
            #     return jsonify({'error': 'Invalid username or password'}), 401
        except Exception as e: print(e)
    else:
        return print("Please login")

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    print('Logged out successfully.', 'success')
    return jsonify({'success': 'Logged out successfully.'}), 200 

@app.route('/update_info', methods=['GET', 'POST'])
def update_info():
    user_id = session.get('user_id')
    if not user_id:
        print("Need user id", user_id)
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
    user = cur.fetchone()
    cur.close()
    if not user:
        print('User not found.', 'error')
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        first_name = request.json['firstName']
        last_name = request.json['lastName']
        if not username or not password or not first_name or not last_name:
            print('All fields are required.', 'error')
        else:
            cur = mysql.connection.cursor()
            cur.execute('UPDATE user SET username = %s, password = %s, f_name = %s, l_name = %s WHERE user_id = %s', (username, password, first_name, last_name,  user_id))
            mysql.connection.commit()
            cur.execute('SELECT * FROM user WHERE user_id = %s', (user_id,))
            updated_user = cur.fetchone()
            cur.close()
            print('Profile updated successfully.', 'success')
            

    return jsonify(updated_user)


@app.errorhandler(404)  
def not_found(err):  
    return app.send_static_file('404.html')

@app.route('/NFL_NEWS')
def scrape_NFL_News():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/nfl')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    news_div = soup.findAll("div", {"class":"list-item"})

    news_list =[]

    for news in news_div:
        headline_tag = news.find("span", {"class":"rdf-meta hidden"})
        headline = headline_tag['content'] + "."
        picture = news.find('picture')
        img_tag = picture.find('img')
        img = img_tag['src']
        description_div = news.find("div", {"class": "list-item__title"})
        description = description_div.find("a").text + "."
        url = "https://www.sportingnews.com" + description_div.find("a")["href"]
        nfl_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(nfl_news)
        
        
    return jsonify(news_list)

@app.route('/NBA_NEWS')
def scrape_NFL_Nba():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/nba')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    news_div = soup.findAll("div", {"class":"list-item"})

    news_list =[]

    for news in news_div:
        headline_tag = news.find("span", {"class":"rdf-meta hidden"})
        headline = headline_tag['content'] + "."
        picture = news.find('picture')
        img_tag = picture.find('img')
        img = img_tag['src']
        description_div = news.find("div", {"class": "list-item__title"})
        description = description_div.find("a").text + "."
        url = "https://www.sportingnews.com" + description_div.find("a")["href"]
        nba_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(nba_news)
        
        
    return jsonify(news_list)



@app.route('/MLB_NEWS')
def scrape_MLB_News():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/mlb/news')

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
        mlb_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(mlb_news)
        
        
    return jsonify(news_list)


@app.route('/NHL_NEWS')
def scrape_NHL_News():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/nhl/news')

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
        nhl_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(nhl_news)
        
        
    return jsonify(news_list)

@app.route('/CFB_NEWS')
def scrape_CFB_News():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/ncaa-football/news')

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
        cfb_news = {"headline": headline, "links": url, "image": img, "description": description}

        news_list.append(cfb_news)
        
        
    return jsonify(news_list)



@app.route('/SOCCER_NEWS')
def scrape_SOCCER_News():
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/soccer/news')

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



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(DEBUG="True",host='0.0.0.0', port=port)