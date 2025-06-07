"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token 
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

#Allow CORS request to this API

#Create a route to authenticate your users and return JWTs
#Create access token() function is used to actually generate the JWT
@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("pasword", None)

    if username != "sammysmith1234" or password != "abc123":
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identify=username)
    return jsonify(access_token=access_token)
    
#HW
#Create a signup route and test it on postman
#you will  receive the email and a pasword
#

@api.route('/signup', methods=['POST'])
def register_user():
    email = request.json.get('email')
    password = request.json.get('pasword')

    #query  the DB to check if the email already exist
    email = email.lower()
    user = User.query.filter_by(email=email).first()

    #check if the email exist
    if user is not None and user.email == email:
        response = {
            "message": f"{user.email} already exist. Please log in"
        }
        return jsonify(response), 403
    
    new_user = User()
    new_user.email = email
    new_user.password = password
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()

    response = {
        "message": f"Awesome {new_user.email}! You hvae succesfully signed up! Please Log in."
    }

    return jsonify(response), 201

