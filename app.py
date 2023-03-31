#!/usr/bin/python3

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import requests


app = Flask(__name__, static_url_path='/', static_folder='./sports-odds/out')
CORS(app, support_credentials=True)

@app.route("/")  
def index():  
    return app.send_static_file('index.html')

@app.errorhandler(404)  
def not_found(err):  
    return app.send_static_file('404.html')

@app.route('/NBA_NEWS')
@cross_origin(supports_credentials=True)
def scrape_NFL_News():
    # url = request.json.get('https://www.sportingnews.com/us/nfl')
    
    page_to_scrape = requests.get('https://www.sportingnews.com/us/nfl')

    soup = BeautifulSoup(page_to_scrape.text, "html.parser")

    news_div = soup.findAll("div", {"class":"list-item"})

    nfl_news = {}

    for news, i in zip(news_div, range(10)):
        news_list =[]
        headline_tag = news.find("span", {"class":"rdf-meta hidden"})
        headline = headline_tag['content']
        picture = news.find('picture')
        img_tag = picture.find('img')
        img = img_tag['src']
        description_div = news.find("div", {"class": "list-item__title"})
        description = description_div.find("a").text
        url = "https://www.sportingnews.com" + description_div.find("a")["href"]
        news_list.append(headline)
        news_list.append(img)
        news_list.append(description)
        news_list.append(url)
        nfl_news[i] = news_list
        

    
    return nfl_news
    
if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000, debug=True)
