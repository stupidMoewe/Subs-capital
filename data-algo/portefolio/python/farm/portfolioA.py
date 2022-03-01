import pandas as pd
import numpy as np
import scipy
from scipy.optimize import minimize
import pandas_datareader.data as web
import datetime

def calculateWeights():
    return "LOOLO"

# inputs: tokens used => calculate risks, pool rates => rentabilite des placements  

def riskFunction(w):
    return np.dot(w.T, np.dot(Sigma, w))

def checkMinReturn(w):
    rmin = 0.003
    RHS = rmin - np.sum(pBar*w)
    return RHS

def checkSumToOne(w):
    return np.sum(w) - 1

# STEP 1: fetch data tokens
# time frame
start = datetime.datetime(2021, 1, 2)
end=datetime.datetime(2021, 1, 30)

# tokens data
BTC = web.DataReader('BTC-USD', 'yahoo',start, end)
ETH = web.DataReader('ETH-USD', 'yahoo',start, end) 
# USDT= web.DataReader('USDT-USD', 'yahoo',start, end) 
# BNB = web.DataReader('BNB-USD', 'yahoo',start, end) 
# USDC= web.DataReader('USDC-USD', 'yahoo',start, end) 
# ADA= web.DataReader('ADA-USD', 'yahoo',start, end) 
# HEX= web.DataReader('HEX-USD', 'yahoo',start, end) 
# XPR= web.DataReader('XPR-USD', 'yahoo',start, end) 
# LUNA1= web.DataReader('LUNA1-USD', 'yahoo',start, end) 
# DOGE= web.DataReader('DOGE-USD', 'yahoo',start, end) 
# DOT= web.DataReader('DOT-USD', 'yahoo',start, end) 
# AVAX= web.DataReader('AVAX-USD', 'yahoo',start, end) 
# MATIC= web.DataReader('MATIC-USD', 'yahoo',start, end) 
# SHIB= web.DataReader('SHIB-USD', 'yahoo',start, end) 
# CRO= web.DataReader('CRO-USD', 'yahoo',start, end) 
# DAI = web.DataReader('DAI-USD', 'yahoo',start, end) 
LINK= web.DataReader('LINK-USD', 'yahoo',start, end) 

# WBTC= web.DataReader('WBTC-USD', 'yahoo',start, end) 
# sUSD= web.DataReader('sUSD-USD', 'yahoo',start, end) 
# SUSHI= web.DataReader('SUSHI-USD', 'yahoo',start, end) 
# AAVE= web.DataReader('AAVE-USD', 'yahoo',start, end) 

stocks = pd.concat([BTC['Close'], 
                    ETH['Close'],
                    # USDT['Close'],
                    # BNB['Close'],
                    # USDC['Close'],
                    # ADA['Close'],
                    # HEX['Close'],
                    # XPR['Close'],
                    # LUNA1['Close'],
                    # DOGE['Close'],
                    # DOT['Close'],
                    # AVAX['Close'],
                    # MATIC['Close'],
                    # SHIB['Close'],
                    # CRO['Close'],
                    # DAI['Close'],
                    LINK['Close']], 
                    axis=1)
stocks.columns=['BTC','ETH'
#,'ETH','USDT','BNB','USDC','ADA','HEX','XPR','LUNA1','DODGE','DOT','AVAX','MATIC','SHIB','CRO','DAI'
,'LINK']

returns = stocks/stocks.shift(1)
logReturns = np.log(returns)
print(logReturns)

# STEP 2: calculate var/cov matrix

pBar = logReturns.mean() # APR
Sigma = logReturns.cov()

nbOfAssets = len(stocks.columns)
bounds=tuple((0,1) for _ in range(nbOfAssets))
w0=[1/nbOfAssets]*nbOfAssets # init at equal weights

constraints=({'type':'eq', 'fun':checkMinReturn},{'type':'eq', 'fun':checkSumToOne})
w_opt = minimize(riskFunction, w0, method='SLSQP', bounds=bounds, constraints=constraints)
risk = riskFunction(w_opt.x)
rate = np.sum(pBar*w_opt.x)
print('risk: ',risk)
print('rate: ',rate)
print('w_opt: ',w_opt)