# import needed modeules...
import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, Jsonify

# create an engine and connection setup..reflect tables into sqlalchemy ORM ...
engine = create_engine("sqlite:///covid.db")
Base = automap_base()
Base.prepare(engine, reflect=True)

# re-define our tables to python and save them...
Covid_total = Base.classes.covid_total
Covid_monthly = Base.classes.covid_monthly_avg
Covid_world = Base.classes.covid_world_stat
Covid_states = Base.classes.covid_states_stat

## Flask Setup
app = Flask(__name__)
app.config['DEBUG'] = True

## flask routes
@app.route('/')
def welcome():
    """List all available routes"""
    return (
        f"Available Routes: <br/>"
        f"/api/v1.0/Covid_total<br/>"
        f"/api/v1.0/Covid_monthly<br/>"
        f"/api/v1.0/Covid_world<br/>"
        f"/api/v1.0/Covid_states<br/>"
    )
# create a route..
@app.route('/api/v1.0/Covid_total')
def Covid_total():
    ## create session
    session = Session(engine)

    # query database for needed information
    """ Return a json dictionary of dates and precipitation from Measurement database"""
    results = session.query(Covid_total.State, Covid_total.Total_cases, Covid_total.Case_rate_per_100k, 
                            Covid_total.Total_deaths, Covid_total.Death_rate_per_100k).all()
    session.close()

    # create the list and then iterate over our query to return needed values....
    all_Covid_total = []
    for State, Total_cases, Case_rate_per_100k, Total_deaths, Death_rate_per_100k in results:
        Covid_total_dict = {}
        Covid_total_dict['State'] = State
        Covid_total_dict['Total_cases'] = Total_cases
        Covid_total_dict['Case_rate_per_100k'] = Case_rate_per_100k
        Covid_total_dict['Total_deaths'] = Total_deaths
        Covid_total_dict['Death_rate_per_100k'] = Death_rate_per_100k

        all_Covid_total.append(Covid_total_dict)    
    return jsonify(all_Covid_total)

# @app.route('/api/v1.0/stations')
# def station():
#     session = Session(engine)

#     """ Return a json list of stations in Station database"""

#     station_result = session.query(Station.station).all()
#     session.close()

#     # create the list and then iterate over our query to return needed values....
#     station_list = []
#     for stn in station_result:
#         if stn not in station_list:
#             station_list.append(stn)
#     return jsonify(station_list)

# @app.route('/api/v1.0/tobs')
# def tobs():
#     session = Session(engine)

#     """ Return a json list of temperature observation (tobs) of the most active station for the last year"""
#     """ Most active station is station number USC00519281..this is from the first part of the hw"""

#     tobs_result = session.query(Measurement.tobs).\
#         filter(Measurement.station == 'USC00519281').\
#         filter(Measurement.date <= '2017-08-23', Measurement.date >= '2016-08-23').all()
#     session.close()

#     # create the list and then iterate over our query to return needed values....
#     tobs_list = []
#     for tob in tobs_result:
#         tobs_list.append(tob)
#     return jsonify(tobs_list)

# @app.route('/api/v1.0/<start>')
# def stt(start=None):
#     session = Session(engine)

#     """ Return a json list of the minimum, maximum and average temperature for a given start date"""
#     """Start date is now a parameter in the API get request """
#     """Date entry format is: %Y-%m-%d"""  

#      # query database for needed information
#     sel = [func.min(Measurement.tobs), func.max(Measurement.tobs), func.avg(Measurement.tobs)]
#     start_result = session.query(*sel).\
#         filter(Measurement.date >= start).all()
#     session.close()

#     # create the list and then iterate over our query to return needed values....
#     start_list = []
#     for res in start_result:
#         start_list.append(res)
#     return jsonify(start_list)
# @app.route('/api/v1.0/<start>/<end>')
# def st(start=None, end=None):
#     session = Session(engine)

#     """ Return a json list of the minimum, maximum and average temperature for a given start-end date range"""
#     """Date entry format is: %Y-%m-%d"""
    
#      # query database for needed information
#     sel = [func.min(Measurement.tobs), func.max(Measurement.tobs), func.avg(Measurement.tobs)]
#     start_results = session.query(*sel).\
#         filter(Measurement.date >= start).\
#         filter(Measurement.date <= end).all()
#     session.close()

#     # create the list and then iterate over our query to return needed values....
#     start_list = []
#     for res in start_results:
#         start_list.append(res)
#     return jsonify(start_list)

if __name__ == '__main__':
    app.run(debug=True)