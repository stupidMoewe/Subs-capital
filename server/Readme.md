This server does the following

1. Collects protols'data from The Graph
2. Calculates apr for each pool
3. Runs the python algorithm to determine best weights
4. Returns the weights for each BC, Protocol + global proportions for each token

For technical reasons, numbers are stored multiplied by 10^8
=> 5% = 0.05 => stored as 500'000
