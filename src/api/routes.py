"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime#para calcular el tpo
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route("/token", methods=["POST"])#ok
def create_token():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        if email and email != "" and email != undefined: 
            return jsonify({"msg": "Bad email or password"}), 401

        expiration_time = datetime.timedelta(minutes=5)
        access_token = create_access_token(identity=email, expires_delta=expiration_time)
        return jsonify({"access_token": access_token, "email": email})


@api.route("/register", methods=["POST"])#funciona
def register_new_user():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        repetido = User.query.filter_by(email=email).first()

        if email == repetido:
            return jsonify({"msg": "this email has already been added to the database"})
        else:
            user = User(email=email, password=password, is_active = True)
            db.session.add(user)
            db.session.commit()

        return jsonify({"usuario añadido": email,
                        "pass": password})


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
        # body = request.get_json() # obtener el request body de la solicitud
        # if body is None:
        #     return "The request body is null", 400
        # if 'email' not in body or 'password' not in body:
        #     return "You have to send both email and password in the request body", 400
  
        # user = User.query.filter_by(email=body["email"]).first()
        # if (user):
        dictionary = {
            "message": "Now you can access to the private route with your token!"
            # "user": user.serialize()
        }

        return jsonify(dictionary), 200