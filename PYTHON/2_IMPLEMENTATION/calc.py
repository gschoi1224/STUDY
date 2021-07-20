import sys
import pyperclip
while True :
    num = float(input())
    result = str(round(num * 1.6, 2)) + 'vh'
    pyperclip.copy(result)
    print(result)