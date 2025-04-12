import hashlib

def hash_string(string):
    encoded_string = string.encode('utf-8')
    hashed = hashlib.sha256(encoded_string).hexdigest()
    return hashed 
