import pandas_datareader.data as web
import pandas as pd
import datetime
import numpy as np
import math
from scipy.optimize import minimize

############
### DATA ###
############

# time frame
start = datetime.datetime(2021, 1, 1)
end=datetime.datetime(2022, 1, 1)

# tokens data
WBTC = web.DataReader('WBTC-USD', 'yahoo',start, end)
ETH = web.DataReader('ETH-USD', 'yahoo',start, end) 
USDT= web.DataReader('USDT-USD', 'yahoo',start, end) 
USDC= web.DataReader('USDC-USD', 'yahoo',start, end) 
DAI = web.DataReader('DAI-USD', 'yahoo',start, end) 

# UNISWAP
allTokens=pd.concat([WBTC['Close'], 
                        ETH['Close'],
                        USDT['Close'],
                        USDC['Close'],
                        DAI['Close']], 
                        axis=1)
allTokens.columns=['WBTC','ETH','USDT','USDC','DAI']

pools=[['USDC','ETH'],['ETH','USDT'],['DAI','USDC'],['USDC','USDT'],['WBTC','ETH']]
pools_names=[] 
for pool in pools:
    pools_names.append(pool[0]+"-"+pool[1])

returns = allTokens/allTokens.shift(1)
logReturns = np.log(returns)[1:]
meanReturns=returns.mean()
meanLogReturns=logReturns.mean()

# 2: Calculate STD for each token
std_logReturns=logReturns.std()

def calculate_pool_std(token1_name, token2_name):
    df=pd.concat([logReturns[token1_name], logReturns[token2_name]], axis=1)
    df.columns=['token1','token2']
    cov_matrix=df.cov()
    var_x1=cov_matrix.iloc[0,0]
    var_x2=cov_matrix.iloc[1,1]
    cov_x1_x2=cov_matrix.iloc[1,0]
    return math.sqrt(var_x1 + var_x2 + 2*cov_x1_x2)

def calculate_pool_std_daily(pool_name, index):
    token1=pool_name.split('-')[0]
    token2=pool_name.split('-')[1]
    
    pool=pd.concat([logReturns[token1][[index-1,index]], logReturns[token2][[index-1,index]]], axis=1)
    pool.columns=['token1','token2']
    
    cov_matrix=pool.cov()
    var_x1=cov_matrix.iloc[0,0]
    var_x2=cov_matrix.iloc[1,1]
    cov_x1_x2=cov_matrix.iloc[1,0]
    return math.sqrt(var_x1 + var_x2 + 2*cov_x1_x2)

# 3: Calculate Sigma for each pool
pools_std=pd.DataFrame(columns=['std'], index=(pools_names))
for pool_name in pools_names:
    token1_name=pool_name.split('-')[0]
    token2_name=pool_name.split('-')[1]
    pools_std['std'][pool_name]=calculate_pool_std(token1_name,token2_name)  

def calculateDailyEsperance(pool1_name, pool2_name,P1_1y, P2_1y, index):
    p1=calculate_pool_std_daily(pool1_name, index)
    p2=calculate_pool_std_daily(pool2_name, index)
    return (p1-P1_1y)*(p2-P2_1y)

def calculate_cov_two_pools(pool1_name, pool2_name):
    P1_1y=pools_std['std'][pool1_name]
    P2_1y=pools_std['std'][pool2_name]
    
    nb_of_elements=0
    sum_elements=0
    for index in range(2,20):
        sum_elements+=calculateDailyEsperance(pool1_name, pool2_name, P1_1y, P2_1y,index)
        nb_of_elements+=1
        
    return sum_elements/(nb_of_elements-1)

# 4: Calcul cov

V = pd.DataFrame(columns=pools_names, index=(pools_names))
for i, pool1 in enumerate(V):
    for j, pool2 in enumerate(V):
        V.iloc[i][j]= calculate_cov_two_pools(pool1,pool2)

rmin = 0.05
pBar=[0.1207,0.1346,0.0037,0.0308,0.0269]

Sigma=V.values
nb_of_assets=len(pools_names)
w0 = [1/nb_of_assets]*nb_of_assets
bounds=((0,1),)*nb_of_assets

def riskFunction(w):
    return np.dot(w.T, np.dot(Sigma, w))

def checkMinReturn(w):
    RHS = rmin - np.sum(pBar*w)
    return RHS

def checkSumToOne(w):
    return np.sum(w) - 1

constraints=({'type':'eq', 'fun':checkMinReturn},{'type':'eq', 'fun':checkSumToOne})
    
w_opt = minimize(riskFunction, w0, method='SLSQP', bounds=bounds, constraints=constraints)

risk = math.sqrt(riskFunction(w_opt.x))
rate = np.sum(pBar*w_opt.x)
print(pBar)
print(risk, w_opt.x)