import mysql.connector
from modules.pswd_config import Password_gen

class Login:
    def __init__(self):
        self.outcome={"success":False}
    def log_in(self,user,paswd):
        try:
            mydb = mysql.connector.connect(host="localhost",user="root",database="python_13")
            mycursor = mydb.cursor()
            sql = "SELECT username,email,password,role FROM employee WHERE username = '"+str(user)+"'"
            mycursor.execute(sql)
            myresult=mycursor.fetchall() 
            if len(myresult)==0:
                self.outcome["message"]="user doesn't exist"
            else:
                p=Password_gen()
                decrypted_pswd=p.decrypt_text(myresult[0][2],5)
                if decrypted_pswd==paswd:
                    self.outcome["success"]=True
                    self.outcome["user_details"]=myresult[0]
                else:
                    self.outcome["message"]="Wrong password"
            return self.outcome 
        except:
            self.outcome["message"]="0"
            return self.outcome
            
    def fetch_QA(self,user):
        try:
            mydb = mysql.connector.connect(host="localhost",user="root",database="python_13")
            mycursor = mydb.cursor()
            sql = "SELECT authques,authans,password,email FROM employee WHERE username = '"+str(user)+"'"
            mycursor.execute(sql)
            myresult=mycursor.fetchall() 
            if len(myresult)==0:
                self.outcome["message"]="user doesn't exist"
            else:
                self.outcome["success"]=True
                self.outcome["user_details"]=myresult[0]
            return self.outcome 
        except:
            self.outcome["message"]="0"
            return self.outcome
