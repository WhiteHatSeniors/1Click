import pymongo
import pickle
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from bson.objectid import ObjectId

# myclient = pymongo.MongoClient(
#     "mongodb+srv://millijack34:aptrm5%40123@eventscluster.cstc6fy.mongodb.net/"
# )

# mydb = myclient["EventsDB"]

# user_coll = mydb["users"]


def stem(text):
    ps = PorterStemmer()
    y = []
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)


def recommend(id, user_coll):
    # id = {"$oid": "649d8e0f9097710f189bf3dc"}

    id = ObjectId(id)

    all_events = pickle.load(open("all_events.pkl", "rb"))
    user_data = {}
    for user in user_coll.find({"_id": id}):
        user_data = user

    topics = user_data["topics"]
    langs = " ".join(user_data["languages"])
    usertags = stem(" ".join(topics).lower() + " " + langs.lower())

    index = len(all_events)
    all_events.loc[index] = {
        "_id": id,
        "name": user_data["name"],
        "tags": usertags,
    }

    # Vectorizing the data
    cv = CountVectorizer(max_features=400, stop_words="english")
    vectors = cv.fit_transform(all_events["tags"])

    # Generating cosine similarity
    similarity = cosine_similarity(vectors)

    simil_events = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1]
    )

    rec_events = []
    for i in simil_events:
        rec_events.append((all_events.iloc[i[0]]["_id"]))
    return rec_events
