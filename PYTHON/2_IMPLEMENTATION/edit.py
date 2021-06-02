import sys
import pyperclip
input = sys.stdin.readline

data = []
paragraph = []
while True :
    s = input().rstrip()
    if (s == "e") :
        if len(paragraph) > 1 :
            paragraph[len(paragraph) - 1] = str.replace(paragraph[len(paragraph) - 1], '|', '')
        data.append(paragraph)
        break
    if s != '' :
        paragraph.append(s + '|')
    else :
        if len(paragraph) > 1 :
            paragraph[len(paragraph) - 1] = str.replace(paragraph[len(paragraph) - 1], '|', '')
        data.append(paragraph)
        paragraph = []

total = ''
for d in data :
    for p in d :
        total += p
    total += '\n'
pyperclip.copy(total)
print(total)