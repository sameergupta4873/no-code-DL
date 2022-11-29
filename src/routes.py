from src import app
from flask import render_template,request,redirect,url_for,jsonify
from werkzeug.datastructures import ImmutableMultiDict
from src.destructure_conv import getconvmodel

@app.route('/')
def home() :
    return redirect(url_for('cnn'))


@app.route('/cnn',methods=["GET","POST"])
def cnn() :
    if request.method=='POST' :
        
        imd = ImmutableMultiDict(request.form)
        data = imd.to_dict()
        print(request.form)
        #print(data)
        
        #return render_template('result.html',data=data)
        #return redirect(f'/result/{data}')
        code = getconvmodel(data['nodes'],data['adjList'])
        print(code)
        
        return jsonify({'code':code})
    return render_template('home.html')

@app.route('/standard',methods=["GET","POST"])
def standard() :
    if request.method == 'POST' :
        imd = ImmutableMultiDict(request.form)
        data = imd.to_dict()



@app.route('/result/<data>')
def result(data) :
    return render_template('result.html',data=data)