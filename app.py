# import needed modeules...
import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify, render_template
from flask_cors import CORS

# create an engine and connection setup to querry database...
engine = create_engine("sqlite:///DataBase/covid-19.db")
Base = automap_base()
Base.prepare(engine, reflect=True)

# re-define our tables to python and save them...
States = Base.classes.states
Monthly = Base.classes.monthly
World = Base.classes.world

## Flask Setup
app = Flask(__name__)
app.config['DEBUG'] = True

## flask routes to render HTML templates
@app.route('/')
def welcome():
    return render_template("chart.html") 

def map():
    return render_template("index.html") 

# list of available routes
def route():
    """List all available routes"""
    return (
        f"Available Routes: <br/>"
        f"/api/v1.0/states<br/>"
        f"/api/v1.0/monthly<br/>"
        f"/api/v1.0/world<br/>"
    )

# create a route for states table..
@app.route('/api/v1.0/states')
def states():
    # create session querry data and return a JSON file
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM states", conn)
    session.close()
    return df.to_json(orient="records")

# create a route for monthly table..
@app.route('/api/v1.0/monthly')
def monthly():
    # create session querry data and return a JSON file
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM monthly", conn)
    session.close()
    return df.to_json(orient="records")

# create a route for world table..
@app.route('/api/v1.0/world')
def world():
    # create session querry data and return a JSON file
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM world", conn)
    session.close()
    return df.to_json(orient="records")

if __name__ == '__main__':
    app.run(debug=True)