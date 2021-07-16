from flask import Flask,redirect,render_template,url_for,request,session
from flask.helpers import make_response
from mysql.connector import constants
from modules.login import Login
from modules.Actions import Action
import json
from modules.mailer import send_message
from modules.pswd_config import Password_gen

app=Flask(__name__)
app.secret_key='yyyyy@123456789'
name=""

#Home page to login
@app.route("/",methods=["GET","POST"])
def index():
    message=""
    if 'userdetail' in session:
        return redirect(url_for("home"))
    if request.method=="POST":
        username=request.form.get("username")
        password=request.form.get("password")
        obj=Login()
        output=obj.log_in(username,password)
        del obj
        if not output["success"]:
            message=output["message"]
        else:
            user_detail=output["user_details"]
            session['userdetail']={'name':user_detail[0],'email':user_detail[1],'role':user_detail[3]}
            return redirect(url_for("home"))
    return render_template("index.html",message=message)

#page to reset the password
@app.route("/forgot",methods=["GET","POST"])
def reset():
    global name
    message=Ques=""
    if request.method=="POST":
        request_name=request.form.get("submit")
        print('request',request_name)
        if request_name=="Continue":
            username=request.form.get("name")
            obj=Login()
            output=obj.fetch_QA(username)
            print('output',output)
            del obj
            if not output["success"]:
                message=output["message"]
            else:
                Ques=output["user_details"][0]
                name=username
        else:
            answer=request.form.get("ans")
            obj=Login()
            output=obj.fetch_QA(name)
            del obj
            Ques=output["user_details"][0]
            Ans=output["user_details"][1]
            if answer==Ans:
                p=Password_gen()
                decrpt_pswd=p.decrypt_text(output["user_details"][2],5)
                send_message(output["user_details"][3],decrpt_pswd)
                Ques=Ans=""
                message='1'
            else:
                message="Wrong answer"
    return render_template("forgot.html",message=message,Ques=Ques)

@app.route("/Home",methods=["GET"])
def home():
    if 'userdetail' in session:
        try:
            name=session['userdetail']["name"]
            email=session['userdetail']["email"]
            role=session['userdetail']["role"]
            obj=Action()
            s=obj.get_user_list('superadmin')
            s=s['result']
            a=obj.get_user_list('admin')
            a=a['result']
            u=obj.get_user_list('user')
            u=u['result']
            return render_template("home.html",name=name,email=email,role=role,superadmins=s,admins=a,users=u,count=[len(s),len(a),len(u)])
        except:
            session.pop('userdetail',None)
            return redirect(url_for('index'))  
    return redirect(url_for('index'))



@app.route("/delete",methods=["GET"])
def delete():
    if 'userdetail' in session:
        name=request.args.get('name')
        obj=Action()
        result=obj.delete_user(name)
        del obj
        result=json.dumps(result)
        return make_response(result)
    return redirect(url_for('index'))

@app.route("/create",methods=["POST"])
def create():
    if 'userdetail' in session:
        if request.method=='POST':
            data=request.get_json()
            name=data['name']
            email=data['email']
            role=data['role']
            ques=data['ques']
            ans=data['ans']
            obj=Action()
            result=obj.check_username(name)
            print(result)
            if 'error' in result or 'nameerror' in result:
                result=json.dumps(result)
                return make_response(result)
            else:
                result=obj.create_user(name,email,role,ques,ans)
                result=json.dumps(result)
                return make_response(result)
    return redirect(url_for('index'))

@app.route("/update",methods=["POST"])
def update():
    if 'userdetail' in session:
        data=request.get_json()
        print(data)
        name=data['user']
        role=data['role']
        obj=Action()
        result=obj.change_role(name,role)
        del obj
        result=json.dumps(result)
        return make_response(result)
    return redirect(url_for('index'))


@app.route("/logout",methods=["GET"])
def logout():
    session.pop('userdetail',None)
    return redirect(url_for('index'))
app.run(debug=True)