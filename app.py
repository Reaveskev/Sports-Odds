#!/usr/bin/python3

from flask import Flask, jsonify, send_from_directory, request, redirect
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import requests
import os


#  static_url_path='/'
app = Flask(__name__, static_folder='./sports-odds/out')
CORS(app, support_credentials=True)

# Set up configuration classes
class BaseConfig:
    DEBUG = False
    TESTING = False

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    DEVELOPMENT = True

class ProductionConfig(BaseConfig):
    DEBUG = False
    DEVELOPMENT = False

if app.env == "development":
    app.config.from_object(DevelopmentConfig)
else:
    app.config.from_object(ProductionConfig)


@app.route("/", defaults={'path': ''})  
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path + ".html"):
        new_path = path + ".html"
        return send_from_directory(app.static_folder, new_path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
    


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
  app.debug=True
  app.run()