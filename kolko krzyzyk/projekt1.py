
import math


def komb(n, k):
    #print(n,k)
    if n-k < 0 :
        return - 100000
    else:
        return (  math.factorial(n) )/ ( ( math.factorial(k))  * ( math.factorial(n-k))  )

def KsubRevDoorRank(T, k):
    r = (k % 2)*(-1)
    s = 1
    for i in range (k, 0, -1):
        
        r = r + (s * komb(T[i-1], i))
        s = s * (-1)
    return int(r)

def KsubRevDoorUnrank(r,k,n):

    Tr = []
    x = n
    for i in range (k, 0, -1):
        
        while (komb(x,i) > r):
            x -= 1
        Tr.append(x+1)
        
        xx = (komb(x+1,i)) 
        r = xx - r -1
    Tr.reverse()
    return Tr
"""powiedziec co to jest i okreslic algorytm - powiedziec jaki wykorzystales"""
T = [4,8,12]

n = 6
k = 3

r = KsubRevDoorRank(T, k)

T1 = KsubRevDoorUnrank (r-1,k,n)
T2 = KsubRevDoorUnrank (r+1, k, n)
#print(KsubRevDoorUnrank(12,3,6))


print('%s rank: %s' % (T,r))
print('%s poprzednik rank: %s' % (T1,r-1))
print('%s nastepnik rank: %s' % (T2,r+1))

"""
https://www.site.uottawa.ca/~lucia/courses/5165-09/GenCombObj.pdf?fbclid=IwAR32EYfdf7qXMvu6e9u4uDq-rdkb5npq1VBPRDDtoaY9B8-BTnD7N5Cor50
"""