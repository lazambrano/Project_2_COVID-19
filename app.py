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

# create an engine and connection setup..reflect tables into sqlalchemy ORM ...
engine = create_engine("sqlite:///covid-19.db")
Base = automap_base()
Base.prepare(engine, reflect=True)

# re-define our tables to python and save them...
States = Base.classes.states
Monthly = Base.classes.monthly
World = Base.classes.world

## Flask Setup
app = Flask(__name__)
app.config['DEBUG'] = True

## flask routes
@app.route('/')
# @app.route("/")
def welcome():
    return render_template("chart.html") 

def map():
    return render_template("index.html") 

def route():
    """List all available routes"""
    return (
        f"Available Routes: <br/>"
        f"/api/v1.0/states<br/>"
        f"/api/v1.0/monthly<br/>"
        f"/api/v1.0/world<br/>"
    )
# create a route..
@app.route('/api/v1.0/states')
def states():
    ## create session
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM states", conn)
    session.close()
    return df.to_json(orient="records")

@app.route('/api/v1.0/monthly')
def monthly():
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM monthly", conn)
    session.close()
    return df.to_json(orient="records")

@app.route('/api/v1.0/world')
def world():
    session = Session(engine)
    conn = engine.connect()
    df = pd.read_sql("SELECT * FROM world", conn)
    session.close()
    return df.to_json(orient="records")

if __name__ == '__main__':
    app.run(debug=True)