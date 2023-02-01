from src import app
from flask import render_template, request, redirect, url_for, jsonify
from werkzeug.datastructures import ImmutableMultiDict
from src.destructure_conv import getconvmodel
from src.destructure_std import getstdmodel
import json
import asyncio
from src.run_script import run_script
from src.supabaseconnection import upload_model

@app.route('/')
def home():
    return redirect(url_for('cnn'))


@app.route('/cnn', methods=["GET", "POST"])
async def cnn():
    if request.method == 'POST':

        # imd = ImmutableMultiDict(request.form)
        # data = json.loads(imd.to_dict(flat=False)['request'][0])
        # print(request.form)
        # print(data)
        # return render_template('result.html',data=data)
        # return redirect(f'/result/{data}')


        data = request.json

        code,inferece = getconvmodel(data['nodes'], data['adjList'], data['others'], data['commit_id'])

        run_script(code,data['commit_id'])
        
        upload_model(data['commit_id'])
        
        return jsonify({'code': code, 'inference': inferece})
    return 'only POST method is allowed', 405


@app.route('/standard', methods=["GET", "POST"])
def standard():
    if request.method == 'POST':
        #imd = ImmutableMultiDict(request.form)
        # data = json.loads(imd.to_dict(flat=False)['request'][0])
        #data = json.loads(imd.to_dict(flat=False))
        #print(imd)
        # print(data['others'])

        data = request.json

        code,inference = getstdmodel(data['nodes'],data['adjList'],data['others'],data['commit_id'])

        run_script(code, data['commit_id'])

        upload_model(data['commit_id'])

        return jsonify({'code':code,'inference':inference})
    return 'only POST method is allowed', 405


@app.errorhandler(404)
def page_not_found(e):
   
    return 'Invalid endpoint', 404


@app.route('/result/<data>')
def result(data):
    return render_template('result.html', data=data)


@app.route('/about', methods=['GET', 'POST'])
def about():
    if (request.method == 'POST'):
        print(request.json)
        # return redirect(url_for('home')
    return {'about': 'about'}
