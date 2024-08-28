"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import re
email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=["POST"])
def handle_signup():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    if not re.match(email_regex, email):
        return jsonify({"error": "El formato del email no es válido"}), 400
    if User.query.filter_by(email = email).first() is not None:
        return jsonify({"error": "email ya esta siendo utilizado"}), 400
    password_hash = generate_password_hash(password)
    
    try: 
        new_user = User(email = email,  password = password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "Usuario creado exitosamente"}), 201
    except Exception as error:
        db.session.rollback() 
        return jsonify({"error": f"{error}"}), 500

@api.route('/signin', methods=['POST'])
def handle_signin():
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    if email is None or password is None:
        return jsonify({"error": "El email y password es requerido para iniciar sesión"}), 400    
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"error": "Usuario no encontrado"}), 404    
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Se ha producido un error al iniciar sesión, intente nuevamente"}), 400   
    user_token = create_access_token({"id": user.id, "email": user.email})
    return jsonify({"token": user_token}), 200
