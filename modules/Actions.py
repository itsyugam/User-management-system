import mysql.connector
import random
from modules.pswd_config import Password_gen
from modules.mailer import send_message

class Action():
    def __init__(self):
        self.outcome={}
# Connect to the database
    def connect_db(self):
        self.mydb = mysql.connector.connect(host="localhost",user="root",database="python_13")
        self.mycursor = self.mydb.cursor()
# Show All users
    def get_user_list(self,role):
        try:
            self.connect_db()
            self.mycursor.execute(f"SELECT username,email,role FROM employee WHERE role='{role}'")
            myresult=self.mycursor.fetchall()
            self.outcome["result"]=myresult
            return self.outcome
        except:
            self.outcome["error"]='connection error'
            return self.outcome
# Show specific user
    def get_specific_user(self,name):
        try:
            self.connect_db()
            self.mycursor.execute(f"SELECT username,email,role FROM employee WHERE username='{name}'")
            myresult=self.mycursor.fetchall()
            if myresult==None:
                self.outcome["error"]=f"Their is no employee with username {name}"
            else:
                self.outcome["result"]=myresult[0]
            return self.outcome
        except:
            self.outcome["error"]="connection issue"
            return self.outcome

# update the role of a user
    def change_role(self,username,role):
        try:
            self.connect_db()
            self.mycursor.execute(f"UPDATE employee SET role = '{role}' WHERE username='{username}'")
            self.mydb.commit()
            detail=self.get_specific_user(username)
            self.outcome=detail
            return self.outcome
        except:
            self.outcome["error"]="connection issue"
            return self.outcome
# To delete a user
    def delete_user(self,name):
        try:
            self.connect_db()
            self.mycursor.execute(f"DELETE FROM employee WHERE username='{name}'")
            self.mydb.commit()
            self.outcome["message"]="Successfully deleted"
            return self.outcome
        except:
            self.outcome["error"]="connection issue"
            return self.outcome
# Creation of new user
    def create_user(self,name,email,role,ques,ans):
        p=Password_gen()
        rand_pswd=p.Generate()
        encrypted_pas=p.encrypt_text(rand_pswd,5)
        print(encrypted_pas)
        try:
            sql=f"INSERT INTO `employee` (`username`, `email`, `role`, `password`,  `authques`,`authans`) VALUES ('{name}', '{email}', '{role}', '{encrypted_pas}', '{ques}', '{ans}')"
            self.connect_db()
            self.mycursor.execute(sql)
            self.mydb.commit()
            message=f'{rand_pswd},Ques:{ques},Answer:{ans}'
            send_message(email,message)
            self.outcome={}
            return self.outcome
        except:
            self.outcome={"error":"connection error"}
            return self.outcome
    
    def check_username(self,name):
        sql = "SELECT * FROM employee WHERE username = '"+str(name)+"'"
        try:
            self.connect_db()
            self.mycursor.execute(sql)
            myresult=self.mycursor.fetchall()
            if not len(myresult):
                self.outcome={"result":name}
            else:
                self.outcome={"nameerror":"Occupied name"}
            return self.outcome
        except:
            self.outcome={"error":"connection error"}
            return self.outcome

