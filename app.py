#!/usr/bin/env python
# encoding: utf-8
import json
import numpy as np
from flask import Flask, request, jsonify, render_template
from flask_mongoengine import MongoEngine
from flask_pymongo import PyMongo


app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/deforestation_db"
mongo = PyMongo(app)




@app.route("/")
def welcome():
    """List all available api routes."""

    return render_template('index.html')

@app.route("/api/all")
def datareturn():
    """List all available api routes."""
    list2 = list(mongo.db.listings.find({},{ "_id": 0 }))
    
    return json.dumps(list2, default=str)




if __name__ == '__main__':
    app.run(debug=True)

    