#!/usr/bin/python3

import os
from dotenv import load_dotenv

load_dotenv()


mysql_host = os.getenv('MYSQL_HOST')
mysql_user = os.getenv('MYSQL_USER')
mysql_password = os.getenv('MYSQL_PASSWORD')
mysql_db = os.getenv('MYSQL_DB')

print(mysql_host,mysql_user,mysql_password,mysql_db)
