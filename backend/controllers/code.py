import pandas as pd
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.util import ngrams
from sklearn.metrics.pairwise import cosine_similarity
import string
from pymongo import MongoClient
import sys
import argparse
import zipfile

# Download NLTK resources (if not already downloaded)
nltk.download('stopwords')
nltk.download('punkt')

# Load stopwords
stop_words = set(stopwords.words('english'))
threshold=0.8
def tokenize_text(text):
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in stop_words]
    bigrams = list(ngrams(tokens, 2))
    all_tokens = tokens + [token for token in bigrams]
    return all_tokens

def preprocess_text(text):
    # Lowercase the text
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = tokenize_text(text)
    return tokens

def load_glove_embeddings(zip_path, file_name):
    embeddings_index = {}
    with zipfile.ZipFile(zip_path, 'r') as z:
        with z.open(file_name) as f:
            for line in f:
                values = line.decode('utf-8').split()
                word = values[0]
                coefs = np.asarray(values[1:], dtype='float32')
                embeddings_index[word] = coefs
    print("Embedding_Index_Function_Running")
    return embeddings_index

def get_embeddings(tokens, embeddings_index):
    embeddings = []
    for token in tokens:
        if token in embeddings_index:
            embeddings.append(embeddings_index[token])
        else:
            embeddings.append(np.zeros(100))  # Handle out-of-vocabulary words
    return embeddings

def load_keywords_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        keywords_str = f.read().strip()
    keywords_list = keywords_str.split(',')
    return keywords_list

def compute_average_embedding(embeddings):
    return np.mean(embeddings, axis=0)

def prepare_keywords(keywords, embeddings_index):
    preprocessed_keywords = [preprocess_text(keyword) for keyword in keywords]
    keyword_embeddings = [get_embeddings(keyword, embeddings_index) for keyword in preprocessed_keywords]
    average_keyword_embeddings = [compute_average_embedding(embedding) for embedding in keyword_embeddings]
    return average_keyword_embeddings

def find_similar_keywords(description, average_keyword_embeddings, keywords, embeddings_index):
    # Preprocess the description
    desc_tokens = preprocess_text(description)
    
    # Get embeddings for the description tokens
    desc_embeddings = get_embeddings(desc_tokens, embeddings_index)
    
    similar_keywords = []
    
    for i in range(len(desc_embeddings)):
        single_word_embedding = np.array(desc_embeddings[i]).reshape(1, -1)
        cosine_similarities = cosine_similarity(single_word_embedding, average_keyword_embeddings)
        similar_indices = np.where(cosine_similarities > threshold)[1]
        for idx in similar_indices:
            similar_keywords.append(keywords[idx])
    
    return similar_keywords

def return_keywords(_id, type, average_keyword_embeddings, keywords, embeddings_index):
    print("*********************************************************")
    mongo_uri = "mongodb+srv://sahajm2027:xaCf6sU8qBJ0ctCg@cfg.5kjekdy.mongodb.net/?retryWrites=true&w=majority&appName=CFG"  # Replace with your actual MongoDB URI
    client = MongoClient(mongo_uri)
    db = client['test']  # Replace with your actual database name
    content_collection = db[type]
    print("")
    # Retrieve the document with the specified _id and only the keywords and description fields
    document = content_collection.find_one(
        {"_id": _id},
        {"keywords": 1, "description": 1}
    )
    
    if document:
        # Extract existing keywords and description
        existing_keywords = document.get('keywords', [])
        description = document.get('description', None)
        
        # If description exists, find similar keywords
        if description:
            additional_keywords = find_similar_keywords(description, average_keyword_embeddings, keywords, embeddings_index)
            print(additional_keywords)
            # Combine existing keywords with additional keywords and remove duplicates
            combined_keywords = list(set(existing_keywords + additional_keywords))
            
            # Update the document with the new keywords
            content_collection.update_one(
                {"_id": _id},
                {"$set": {"keywords": combined_keywords}}
            )
            
            # Close the connection
            client.close()
            
            # Return the combined keywords
            return combined_keywords
        else:
            client.close()
            return existing_keywords
    else:
        client.close()
        return []

def main():
    parser = argparse.ArgumentParser(description='Process some keywords.')
    parser.add_argument('--id', type=str, required=True, help='The ID of the document')
    parser.add_argument('--type', type=str, required=True, help='The type of the document')
    
    args = parser.parse_args()
    print("ENTERING MAIN FUNCTION")
    # Load GloVe embeddings
    zip_file_path = "C:\\Team-32\\backend\\controllers\\glove.6B.zip"
    glove_file_name = "glove.6B.100d.txt"
    embeddings_index = load_glove_embeddings(zip_file_path, glove_file_name)
    
    # Load keywords
    keywords_file_path = "C:\\Team-32\\backend\\controllers\\keywords.txt"
    keywords = load_keywords_from_txt(keywords_file_path)
    
    # Prepare keyword embeddings
    average_keyword_embeddings = prepare_keywords(keywords, embeddings_index)
    
    # Get and print keywords
    finalKeywords = return_keywords(args.id, args.type, average_keyword_embeddings, keywords, embeddings_index)
    print(finalKeywords)

if __name__ == "_main_":
    main()