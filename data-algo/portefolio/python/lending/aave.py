import pandas as pd
import numpy as np
import scipy
from scipy.optimize import minimize

from bs4 import BeautifulSoup
import urllib.request
import csv

def getHelpMiningPercentages():
    return 

def riskFunction(w):
    return np.dot(w.T, np.dot(Sigma, w))

def checkMinReturn(w):
    rmin = 0.03
    RHS = rmin - np.sum(pBar*w)
    return RHS

def checkSumToOne(w):
    return np.sum(w) - 1

#def aaveDataAnalysis ():
df = pd.read_csv("/Users/teframartin/Informatik/subs/Server-algo/portefolio/data/aave.csv")
dai = df.loc[(df['name']=='Dai Stablecoin')]['avg'].reset_index(drop=True)
usdc = df.loc[(df['name']=='USD Coin')]['avg'].reset_index(drop=True)
trueusd = df.loc[(df['name']=='TrueUSD')]['avg'].reset_index(drop=True)
usdt = df.loc[(df['name']=='Tether USD')]['avg'].reset_index(drop=True)
dates = df.loc[(df['name']=='Dai Stablecoin')]['date'].reset_index(drop=True)

stocks = pd.concat([dates,dai, usdc, trueusd, usdt], axis=1)
stocks.columns=['date','dai', 'usdc', 'trueusd', 'usdt']

pBar = stocks.mean()
Sigma = stocks.cov()

w0 = [0.25, 0.25, 0.25, 0.25]
bounds=((0,1),(0,1),(0,1),(0,1))
constraints=({'type':'eq', 'fun':checkMinReturn},{'type':'eq', 'fun':checkSumToOne})
w_opt = minimize(riskFunction, w0, method='SLSQP', bounds=bounds, constraints=constraints)
risk = riskFunction(w_opt.x)
rate = np.sum(pBar*w_opt.x)
print(w_opt.x)
print(risk)
print(rate)

    #meanData =np.mean(df['avg'])
    #V = np.cov(df['avg'].T)
    #print([df['avg'].T])
    # df = df.drop(columns=['Province/State','Lat', 'Long'])
    # df = df.groupby('Country/Region').agg('sum')
    # dfT = df.T
    # df_time = pd.to_datetime(dfT.index) # change index to datetime
    # datetime_index = pd.DatetimeIndex(df_time.values) 
    # dfT = dfT.set_index(datetime_index)
    # dfT = dfT.sort_values(by=dfT.index.values[-1], axis=1,ascending=False)
    # dfT = dfT.iloc[:,0:number_of_countries] 
    # dfT = dfT.resample(aggregation_time_interval).mean()
    # output = dfT.to_json()
    # print(output)
    # sys.stdout.flush()

##aaveDataAnalysis()