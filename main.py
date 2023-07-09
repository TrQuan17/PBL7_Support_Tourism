# dotenv
from dotenv import dotenv_values

# Machine learining
from sklearn import metrics
import tensorflow as tf
from tqdm import tqdm
import pandas as pd
import numpy as np
import gensim
import re
from pyvi import ViTokenizer, ViPosTagger
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation, Flatten
from tensorflow.keras.layers import  GRU, LSTM, Bidirectional
from tensorflow.keras.layers import Input, Convolution1D, Reshape

# Fast API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymongo
import bson

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Env
config = dotenv_values('.env')
MONGO_URL = config.get('MONGO_URL')
MONGO_DB = config.get('MONGO_DB')

# Train model ---------------------------------------------------

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
    return re.sub(r'[^\w\s]','', text)

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
        'ko' : 'không',
        'đc' : 'được',
        'bt' : 'bình thường',

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

tfidf_vect = TfidfVectorizer(analyzer='word', max_features=30000)
tfidf_fit = tfidf_vect.fit(data.Comment)
X_data_tfidf =  tfidf_vect.transform(data.Comment)

svd = TruncatedSVD(n_components=300, random_state=99)
svd_fit = svd.fit(X_data_tfidf)
X_data_tfidf_svd = svd.transform(X_data_tfidf)


X_train_val, X_test, y_train_val, y_test = train_test_split(X_data_tfidf_svd, data.Rate, test_size=0.2, random_state=99)
X_train, X_val, y_train, y_val = train_test_split(X_train_val, y_train_val, test_size=0.1, random_state=99)

RNN_model = Sequential()

RNN_model.add(Input(shape=(300,)))
RNN_model.add(Reshape((10, 30)))
RNN_model.add(Bidirectional(LSTM(128)))
RNN_model.add(Dense(512, activation='relu'))
RNN_model.add(Dense(512, activation='relu'))
RNN_model.add(Dense(128, activation='relu'))
RNN_model.add(Dense(2, activation='softmax'))
RNN_model.summary()

RNN_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

history = RNN_model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=10, batch_size=256)

val_predictions = RNN_model.predict(X_val)
test_predictions = RNN_model.predict(X_test)
val_predictions = val_predictions.argmax(axis=-1)
test_predictions = test_predictions.argmax(axis=-1)

print("Validation accuracy: ", metrics.accuracy_score(val_predictions, y_val))
print("Test accuracy: ", metrics.accuracy_score(test_predictions, y_test))

# -----------------------------------------------------------------

# Config mongodb
client = pymongo.MongoClient(MONGO_URL)
dbname = client[MONGO_DB]

class Review(BaseModel):
    id: str
    text: str

def update(id, reliability): 
    collection_name = dbname["reviews"]

    myquery = { "_id": bson.ObjectId(id) }
    newvalues = { "$set": {
         "reliability": str(reliability)
    } }

    collection_name.update_one(myquery, newvalues)

    return { 'status': 'SUCCESS' }

@app.put('/review/classify')
def classifyReview(review: Review):
    try:
        input_text = preprocessing(review.text)
        input_text = [input_text]

        input_tf_fitted = tfidf_fit.transform(input_text)
        input_svd_fitted = svd_fit.transform(input_tf_fitted)

        predictions = RNN_model.predict(input_svd_fitted)

        reliability = predictions[0][1]

        update(review.id, reliability)
    except:
        print('Error predictions')
    
