import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.util import ngrams
from sklearn.metrics.pairwise import cosine_similarity
import string

# Download NLTK resources (if not already downloaded)
nltk.download('stopwords')
nltk.download('punkt')

# Load stopwords
stop_words = set(stopwords.words('english'))

def tokenize_text(text):
    tokens = word_tokenize(text)
    tokens = [token for token in tokens if token not in stop_words]
    bigrams = list(ngrams(tokens, 2))
    all_tokens = tokens + bigrams
    return all_tokens

def preprocess_text(text):
    # Lowercase the text
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = tokenize_text(text)
    return tokens

def load_glove_embeddings(file_path):
    embeddings_index = {}
    with open(file_path, 'r', encoding='utf-8') as f:
        for line in f:
            values = line.split()
            word = values[0]
            coefs = np.asarray(values[1:], dtype='float32')
            embeddings_index[word] = coefs
    return embeddings_index

def load_course_keywords_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        course_keywords_str = f.read().strip()
    course_keywords_list = course_keywords_str.split(',')
    return course_keywords_list

def get_embeddings(tokens, embeddings_index):
    embeddings = []
    for token in tokens:
        if token in embeddings_index:
            embeddings.append(embeddings_index[token])
        else:
            embeddings.append(np.zeros(100))  # Handle out-of-vocabulary words
    return embeddings

def compute_average_embedding(embeddings):
    return np.mean(embeddings, axis=0)

def prepare_course_keywords(course_keywords, embeddings_index):
    preprocessed_course_keywords = [preprocess_text(keyword) for keyword in course_keywords]
    keyword_embeddings = [get_embeddings(keyword, embeddings_index) for keyword in preprocessed_course_keywords]
    average_keyword_embeddings = [compute_average_embedding(embedding) for embedding in keyword_embeddings]
    return average_keyword_embeddings

def find_similar_course_keywords(input_text, average_keyword_embeddings, course_keywords):
    # Preprocess the input text
    desc_tokens = preprocess_text(input_text)
    
    # Get embeddings for the input text tokens
    desc_embeddings = get_embeddings(desc_tokens, embeddings_index)
    
    similar_keywords = []
    
    # Threshold for cosine similarity
    threshold = 0.6
    
    for i in range(len(desc_embeddings)):
        single_word_embedding = np.array(desc_embeddings[i]).reshape(1, -1)
        cosine_similarities = cosine_similarity(single_word_embedding, average_keyword_embeddings)
        similar_indices = np.where(cosine_similarities > threshold)[1]
        for idx in similar_indices:
            similar_keywords.append(course_keywords[idx])
    
    return similar_keywords, len(similar_keywords) > 0

# Example usage:
glove_file_path = '/content/glove.6B.100d.txt'
course_keywords_file_path = '/content/Course_Keywords.txt'
input_text = " Server Security"

# Load GloVe embeddings
embeddings_index = load_glove_embeddings(glove_file_path)

# Load course keywords
course_keywords = load_course_keywords_from_txt(course_keywords_file_path)

# Prepare course keyword embeddings
average_course_keyword_embeddings = prepare_course_keywords(course_keywords, embeddings_index)

# Find similar course keywords based on input text
similar_course_keywords, has_similar_course_keywords = find_similar_course_keywords(input_text, average_course_keyword_embeddings, course_keywords)

print("Similar Course Keywords:", similar_course_keywords)
print("Similarity Found:", has_similar_course_keywords)
def find_similar_course_keywords(user_keywords, course_id_keywords, embeddings_index, threshold=0.6):
    user_embeddings = get_embeddings(preprocess_text(user_keywords), embeddings_index)
    user_average_embedding = compute_average_embedding(user_embeddings)
    
    course_similarity_scores = {}
    
    for course_id, course_keywords in course_id_keywords.items():
        course_embeddings = get_embeddings(preprocess_text(course_keywords), embeddings_index)
        course_average_embedding = compute_average_embedding(course_embeddings)
        
        # Calculate cosine similarity
        similarity = cosine_similarity(user_average_embedding.reshape(1, -1), course_average_embedding.reshape(1, -1))[0][0]
        
        if similarity >= threshold:
            course_similarity_scores[course_id] = similarity
    
    # Sort by similarity scores in descending order and get top 10 course IDs
    sorted_courses = sorted(course_similarity_scores.items(), key=lambda item: item[1], reverse=True)[:10]
    
    return [course_id for course_id, _ in sorted_courses]

course_id_keywords = {
    'course_1': 'machine learning, data science, artificial intelligence',
    'course_2': 'data analysis, statistics, R programming',
    'course_3': 'web development, HTML, CSS, JavaScript',
    'course_4': 'graphic design, Adobe Photoshop, Illustrator',
    'course_5': 'network security, cybersecurity, ethical hacking',
    # Add more courses as needed
}

user_id_keywords = 'deep learning, neural networks, AI, machine learning'

# Find top 10 similar courses for the user
top_courses = find_similar_course_keywords(user_id_keywords, course_id_keywords, embeddings_index)

print("Top Course IDs:", top_courses)