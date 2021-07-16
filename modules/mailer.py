import smtplib
#----------------------------------- mailing system 
def send_message(mailid,message,userid='projectceo123@gmail.com',userpassword='podqoieqwtjpbhzl'):
    try:
        s = smtplib.SMTP('smtp.gmail.com', 587)
        s.starttls()
        s.login(userid, userpassword)
        message=f"""Subject:{"Your password"}

        Your password is:{message}
        """
        s.sendmail(userid, mailid,message)
        s.quit()
        return message
    except:
        return 0



