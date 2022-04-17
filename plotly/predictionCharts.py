import sys, os

stockName = sys.argv[1]
# stockName2 = sys.argv[2]

# import mysql.connector

# mydb = mysql.connector.connect(
#     user = "root",
#     host = "localhost",
#     password = "password",
#     database = "fypsystem"
# )
#  mycursor = mydb.cursor()

import pandas as pd
import numpy as np
import math

from matplotlib import pyplot as plt
# %matplotlib inline

import chart_studio
import chart_studio.plotly as py
import chart_studio.tools as tls
import plotly.express as px

username = 'fyp21dl3'
api_key = 'ifPhnP8pKg6OiKbHb69z'
chart_studio.tools.set_credentials_file(username=username, api_key=api_key)

dataPATH = '../data/stockPrice_prediction.csv'
df = pd.read_csv(dataPATH)

print(stockName)
# print(stockName2)

### This file is to plot stockPrice prediction

stockData = df[df['Stock']==stockName]

dateRange = stockData['Date']
price = stockData['CLOSE']

fig = px.scatter(x=dateRange, y=price)

# save the chart to chart studio
py.plot(fig, filename=f'StockPriceChart_1', auto_open=False)

print("finish ploting")

# save the chart in html code
# fig.write_html("plotlytest.html")

# test for the dataset
# sqlStatement = "SELECT * FROM fypsystem.userinfo"

# myresult = mycursor.execute(sqlStatement) # executemany()
# myresult = mycursor.fetchall() # fetch the result , or fetch one
# print(myresult)

# I don't want to change the database now
# mydb.commit() # save the database, commit a change
