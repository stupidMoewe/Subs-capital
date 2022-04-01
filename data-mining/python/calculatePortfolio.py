
import datetime
import numpy as np
import math
from scipy.optimize import minimize
import pandas as pd
import pandas_datareader as pdr

import sys
import json

## get the imports
rmin=sys.argv[1:2]
rmin=float(rmin[0])

###pools = [x for x in sys.argv[2:3]]
#pBar = [x for x in sys.argv[3:4]]
#pBar = [pBar[0][0].split(",")]
#pBar = [int(x) for x in pBar[0]]
pools = sys.argv[2:3][0].split(",")
pBar = [int(x) for x in sys.argv[3:4][0].split(",")]
tokens = sys.argv[4:5][0].split(",")

############
### DATA ###
############

# 1. RECOLT DATA TOKENS 
start = datetime.datetime(2022, 3, 3)
end = datetime.datetime(2022, 3, 31)

# tokens 
length = len(tokens)
tokens_arr = np.empty(shape=(1,length))
tokens_arr_str = np.empty(shape=(1,length))

appended_data = []
appended_columns = []
undesired_tokens = []
for i, val in enumerate(tokens):
    try:
        pair_str = val+'-USD'
        token_name = val
        val = pdr.get_data_yahoo(pair_str, start, end)['Close']
        if(len(val) != 28):
            undesired_tokens.append(token_name)
            continue
        appended_data.append(val)
        appended_columns.append(token_name)
    except: 
        undesired_tokens.append(token_name)
        continue

cleanedPools = []
cleanedPBar = []
for index,pool in enumerate(pools):
    tokens = pool.split("-")
    doesContainUndesiredTokensArr = set(undesired_tokens).intersection(tokens) #[i for i, j in zip(undesired_tokens, tokens) if i == j]
    if(not len(doesContainUndesiredTokensArr)):
        cleanedPools.append(pool)
        cleanedPBar.append(pBar[index])
        
# concat all tokens in 1 Dataframe
allTokens=pd.concat(appended_data, axis=1)
allTokens.columns = appended_columns #[::-1]


pools_names=[] 
for pool in cleanedPools:
    pools_names.append(pool)
    

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
    for index in range(1,27):
        sum_elements+=calculateDailyEsperance(pool1_name, pool2_name, P1_1y, P2_1y,index)
        nb_of_elements+=1
        
    return sum_elements/(nb_of_elements-1)

# 4: Calcul cov

V = pd.DataFrame(columns=pools_names, index=(pools_names))
for i, pool1 in enumerate(V):
    for j, pool2 in enumerate(V):
        V.iloc[i][j]= calculate_cov_two_pools(pool1,pool2)

Sigma=V.values
nb_of_assets=len(pools_names)
w0 = [1/nb_of_assets]*nb_of_assets
bounds=((0,1),)*nb_of_assets

def riskFunction(w):
    return np.dot(w.T, np.dot(Sigma, w))

def checkMinReturn(w):
    RHS = rmin - np.sum(cleanedPBar*w)
    return RHS

def checkSumToOne(w):
    return np.sum(w) - 1

constraints=({'type':'eq', 'fun':checkMinReturn},{'type':'eq', 'fun':checkSumToOne})
    
w_opt = minimize(riskFunction, w0, method='SLSQP', bounds=bounds, constraints=constraints)
risk = math.sqrt(riskFunction(w_opt.x))
rate = np.sum(cleanedPBar*w_opt.x)

# return results
risk = {"risk": risk} 
results = {"results": w_opt.x.tolist()} 
pools_list  = {"pools": cleanedPools}
json_risk = json.dumps(risk)
json_results = json.dumps(results)
json_pools = json.dumps(pools_list)
print(json_risk)
print(json_results)
print(json_pools)