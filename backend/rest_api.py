from flask import Flask
from flask import jsonify
from flask import request
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_pymongo import BSONObjectIdConverter
from flask import json
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

app = Flask(__name__)
api = Api(app)
CORS(app)
# app.run(threaded=True)

app.config['MONGO_DBNAME'] = 'restApi'
# app.config['MONGO_URI'] = 'mongodb://localhost:27017/restApi'

mongo = PyMongo(app)

# @app.after_request
# def after_request(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
#   return response
# get all users 
@app.route('/api/users', methods=['GET'])
def getAllUsers():
  users = mongo.db.user
  output = []
  for s in users.find():
    output.append({'id' : str(s['_id']), 'name' : s['name'], 'email' : s['email'], 'type':s['type'], 'username':s['user_name']})
  return jsonify(output)
  
# get one user from user_id
@app.route('/api/user/<user_id>', methods=['GET'])
def getUser(user_id):
  userObj = mongo.db.user
  s = userObj.find_one({'_id' : ObjectId(user_id)})
  if s:
    output = {'id' : str(s['_id']),'name' : s['name'], 'email' : s['email'], 'type':s['type'], 'username':s['user_name']}
  else:
    output = "No such name"
  return jsonify(output)
  
# update user
@app.route('/api/user/<user_id>', methods=['PATCH'])
def updateUser(user_id):
  userObj = mongo.db.user
  s = userObj.find_one({'_id':ObjectId(user_id)})
  name=0 
  username=0 
  password = 0 
  email=0  
  types = 0

  if s:
    # data = json.loads(request.json)
    if 'name' in request.json:
        name = request.json['name']
    else:
        name = s['name']
    
    if 'email' in request.json:
        email = request.json['email']
    else:
        email = s['email']
    
    if 'type' in request.json:
        types = request.json['type']
    else:
        types = s['type']

    if 'username' in request.json:
        types = request.json['username']
    else:
        types = s['username']

    if 'password' in request.json:
        types = request.json['password']
    else:
        types = s['password']
        
    new_user_id = userObj.find_and_modify({'_id':s['_id']},{"$set":{'name': name, 'email': email, 'type':types}})
    new_user = userObj.find_one({'_id': new_user_id.get('_id')})
    output = {'id' : str(new_user['_id']), 'name' : new_user['name'], 'email' : new_user['email'], 'type': new_user['type']}
  else:
    output = "No such name"
  
  return jsonify({'result' : output})

# add one user
@app.route('/api/user', methods=['POST'])
def addUser():
  userobj = mongo.db.user
  name = request.json['name']
  email = request.json['email']
  types = request.json['type']
  password = hash_password(request.json['password'])
  username = request.json['username']
  user_id = userobj.insert({'name': name, 'email': email, 'type':types, 'user_name':username, 'password':password})
  new_user = userobj.find_one({'_id': user_id })
  output = {'id' : str(new_user['_id']),'name' : new_user['name'], 'e-mail' : new_user['email'], 'type':new_user['type'], 'password':new_user['password']}
  return jsonify({'result' : output})

# validate login
@app.route('/api/authenticate', methods=['POST'])
def validateLogin():
  if request.method == "POST":
    contentjson = json.loads(request.data)
    name = contentjson['username']
    password = contentjson['password']

    userobj = mongo.db.user

    new_user = userobj.find_one({'user_name': name })
    # print new_user

    if new_user:
      if verify_password(new_user['password'],password):
        token = generate_auth_token()
        userobj.find_and_modify({'_id' : new_user['_id']}, {'$set': {'token' : token}},upsert=False)
        output = {'login': True , 'name': name, 'type' : new_user['type'], 'token': token}
        return jsonify(output)
      else:
        return jsonify({'login': False,'error' :"something is wrong"})
    else:
      return jsonify({'login': False,'error' :"username is wrong"})
  else :
    return jsonify({'login': False,'error' :"username is wrong"})

# password hash
def hash_password(password):
    password_hash = pwd_context.encrypt(password)
    return password_hash

# verify password_hash
def verify_password(password_hash, password):
    return pwd_context.verify(password, password_hash)

# create token
def generate_auth_token(expiration = 600):
    s = Serializer('SECRET_KEY')
    return s.dumps({'x': 42})

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=3000, threaded=True)

