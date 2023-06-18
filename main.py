from fastapi import FastAPI
from pydantic import BaseModel
import tensorflow as tf
from pyvi import ViTokenizer, ViPosTagger
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from sklearn import metrics
import numpy as np
import pandas as pd
import re

app = FastAPI()

data = pd.read_csv('CrawData/comments.csv', header=0)

def convert_rate(rate):
    return 1 if rate >= 8 else 0

data.Rate = data.Rate.apply(lambda rate: convert_rate(rate))

def LowerText(text):
    result = ''
    for i in text.split():
        result += i.lower() + ' '

    return result

def SplitSentence(text):
    return text.split('.')

def RemovePunctuation(text):
    return re.sub(r'[^\w\s]', '', text)

def TokenizingText(text):
    return ViTokenizer.tokenize(text)

def GetStopword():
    text = []
    with open('Model/vietnamese-stopwords.txt', encoding='utf-8') as f:
        lines = f.readlines()

    for i in lines:
        text.append(i.replace('\n', ''))

    return text

def RemoveStopword(text):
    text = text.split(' ')
    remove_stopword = [word for word in text if not word in GetStopword()]

    s = ''
    for i in remove_stopword:
        s += i + ' '

    return s

def StandardizingText(text):
    lookup_dict = {
        'ko': 'không',
        'đc': 'được',
        'bt': 'bình thường',

    }

    words = text.split(' ')
    new_words = []

    for word in words:
        if word in lookup_dict:
            word = lookup_dict[word]
        new_words.append(word)
        new_text = " ".join(new_words)
    return new_text

def preprocessing(text):
    text = LowerText(text)
    text = RemovePunctuation(text)
    text = StandardizingText(text)
    text = ViTokenizer.tokenize(text)
    text = RemoveStopword(text)
    return text

data.Comment = data.Comment.apply(lambda text: preprocessing(text))

def predict(text):
    input_text = preprocessing(text)
    input_text = [input_text]
    
    tfidf_vect = TfidfVectorizer(analyzer='word', max_features=30000)
    tfidf_fit = tfidf_vect.fit(data.Comment)
    X_data_tfidf =  tfidf_vect.transform(data.Comment)
    
    svd = TruncatedSVD(n_components=300, random_state=99)
    svd_fit = svd.fit(X_data_tfidf)

    input_tf_fitted = tfidf_fit.transform(input_text)
    input_svd_fitted = svd_fit.transform(input_tf_fitted)
    
    RNN_Model = tf.keras.models.load_model('Model/RNN_Model')
    RNN_Model.predict(input_svd_fitted)
    
print(predict('Bãi biển đẹp'))


# class Review(BaseModel):
#     _id: str
#     text: str


# @app.put('/review/classification')
# def reviewClassification(review: Review):
#     return review.text
