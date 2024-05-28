def printTour(arr,n): 
      
    # Consider first petrol pump as starting point 
    start = 0 
    # These two variable will keep tracking if there is  
    # surplus(s) or deficit(d) of petrol in the truck 
    s = 0          # petrol available the truck till now 
    d = 0        # deficit of petrol till visiting this petrol pump 
      
    # Start from the first petrol pump and complete one loop  
    # of visiting all the petrol pumps and keep updating s and d at each pump 
    for i in range(n): 
      s += arr[i][0] - arr[i][1] 
      if s < 0:            # the truck has a deficit of petrol 
        start = i+1        # change the starting point 
        d += s            # storing the deficit of petrol till current petrol pump 
        s = 0            # starting again from new station 
      
    # when we reach first petrol pump again and sum of the petrol available at the truck 
    # and the petrol deficit till now is 0 or more petrol then return the starting point  
    # else return -1 
    return start if (s+d)>=0 else -1
    
    
# Driver program to test above function 
arr = [[6,4], [3,6], [7,3]] 
start = printTour(arr,3) 
if start == -1: 
  print("No Solution Possible !!!") 
else: 
  print("start = {}".format(start)) 