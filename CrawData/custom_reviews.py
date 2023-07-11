import pandas as pd
import csv

data = pd.read_csv('reviews_pre.csv', header=0)

def convert_rate(rate):
    return 1 if int(rate) >= 3 else 0

data.rate = data.rate.apply(lambda rate: convert_rate(rate))

header = ['review', 'rate']

with open('reviews.csv', 'w', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(header)

    for review, rate in zip(data.review, data.rate):
        writer.writerow([review, rate])

