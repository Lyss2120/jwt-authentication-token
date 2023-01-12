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
        user =  User.query.filter_by(email=email, password=password).first()
        # return jsonify(user.serialize())// con este return me da el user email y id o un none// usa el serialize para retornar algo legible pero seria como un true false
        if User is None:
            # el usuario no se encontró en la base de datos
            return jsonify({"msg": "Bad username or password"}), 401

        expiration_time = datetime.timedelta(minutes=5)
        access_token = create_access_token(identity=email, expires_delta=expiration_time)
        return jsonify({"token": access_token, "user": user.serialize()}), 200


@api.route("/register", methods=["POST"])#funciona
def register_new_user():
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        repetido = User.query.filter_by(email=email).first()

        if repetido:
            return jsonify({"msg": "this email has already been added to the database"})
        else:
            user = User(email=email, password=password, is_active = True)
            db.session.add(user)
            db.session.commit()

        return jsonify({"usuario añadido": email,
                        "pass": password
                        })


@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_hello():
        current_user_id = get_jwt_identity()
        user = User.query.filter_by(email=current_user_id).first()
        return jsonify({"message": "Click here! Now you can access to the private route",
                        "user": user.serialize()}), 200



