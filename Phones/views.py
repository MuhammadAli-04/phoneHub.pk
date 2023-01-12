from django.shortcuts import render
from firebase import Firebase
import json
from django.core.mail import send_mail
from uuid import uuid4
from django.core.mail import send_mail
from datetime import date, datetime


config = {
    "apiKey": "AIzaSyDs3f_7dEjYttSIaS_gyA96Iv6Kyw6d31w",
    "authDomain": "demodb-38d29.firebaseapp.com",
    "projectId": "demodb-38d29",
    "storageBucket": "demodb-38d29.appspot.com",
    "serviceAccount": "C:\\Users\\muham\\Downloads\\PhoneHub\\Project\\service-account-file.json",
    "messagingSenderId": "322915066206",
    "appId": "1:322915066206:web:656ceedbf352d925db6fcf",
    "measurementId": "G-3BRJQ6K3ZM",
    "databaseURL": "https://demodb-38d29-default-rtdb.firebaseio.com/",
}

firebase = Firebase(config)
auth = firebase.auth()
database = firebase.database()
dbStorage = firebase.storage()

# Globalss --------------------------------
logedInUser = None
user = None
template = phonebrand = phonename = None
# -----------------------------------------


# Create your views here.


def specs(request, brand, name, cartt=0):
    mobile = database.child("Brands").child(brand).child(name).get().val()
    crousal = database.child("Crousal").child(brand).child(name).get().val()
    if cartt == 1:
        mobile['show'] = cartt
    if cartt == 2:
        mobile['show'] = cartt
    context = {'mobile': mobile, 'crousal': crousal}
    if user:
        context['userr'] = user
    return render(request, 'specs/specs.html', context)


def addtocart(request, brand, name):
    global logedInUser, template, phonebrand, phonename
    if not logedInUser:
        template = 'addtocart'
        phonebrand = brand
        phonename = name
        return render(request, 'signup-login/signin-login.html')
    else:
        userscart = database.child('Users').child(
            logedInUser['localId']).child('cart').get().val()
        for x in userscart:
            if x[1] == name:
                return specs(request, brand, name, 2)
        list = [brand, name]
        userscart.append(list)
        if (userscart[0][0] == 'Empty'):
            userscart.pop(0)
        database.child('Users').child(
            logedInUser['localId']).child('cart').set(userscart)
        return specs(request, brand, name, 1)


def blogs(request):
    global template
    global user
    template = 'blogs'
    blogss = database.child('blogs').get().val()
    return render(request, 'blogs/blogs.html', {'userr': user, 'blogs': blogss})


def addBlog(request):
    global user
    blog = {
        'issue': request.POST['issue'],
        'phone': request.POST['phone'],
        'content': request.POST['content'],
        'by': user['name'],
        'id': str(uuid4()),
        'comments': ["Empty"]
    }
    blogss = database.child('blogs').get().val()
    if blogss:
        blogss.insert(0, blog)
        database.child('blogs').set(blogss)
    else:
        database.child('blogs').set([blog])
    return blogs(request)


def addComment(request, id):
    print("id : " + id)
    if request.method == 'POST':
        blogss = database.child('blogs').get().val()
        for blog in blogss:
            if id == blog['id']:
                comments = blog['comments']
                if "Empty" in comments:
                    comments = []
                    cmnt = request.POST['comment']
                    name = user['name']
                    comments.insert(0, [cmnt, name])
                    blog['comments'] = comments
                    database.child('blogs').set(blogss)
                else:
                    comments = blog['comments']
                    cmnt = request.POST['comment']
                    name = user['name']
                    print("cmnt" + cmnt)
                    print("name" + name)
                    comments.insert(0, [cmnt, name])
                    blog['comments'] = comments
                    database.child('blogs').set(blogss)
                return blogs(request)
    return blogs(request)


def cart(request, msg=" "):
    global template, user
    template = 'cart'
    context = {}
    if msg != " ":
        context['msg'] = msg
    if user:
        context['userr'] = user
        return render(request, 'cart/cart.html', context)
    else:
        return signIn(request)


def deleteFromCart(request, brand, phone):
    userscart = database.child('Users').child(
        logedInUser['localId']).child('cart').get().val()
    listt = []
    if brand == 'allPhones':
        database.child('Users').child(
            logedInUser['localId']).child('cart').set([['Empty', 'Empty']])
    else:
        for x in userscart:
            if x[0] == brand and x[1] == phone:
                continue
            listt.append([x[0], x[1]])
        if len(listt) == 0:
            listt = [['Empty', 'Empty']]
        database.child('Users').child(
            logedInUser['localId']).child('cart').set(listt)
    return cart(request)


def checkOut(request):
    if request.method == 'POST':
        list = [['Empty', 'Empty']]
        order = database.child('Users').child(
            logedInUser['localId']).child('cart').get().val()
        bill = []
        totalbill = 0
        for item in order:
            brand = item[0]
            phone = item[1]
            amount = database.child('Brands').child(
                brand).child(phone).child('Price').get().val()
            cashamount = amount['USD']
            cash = int(cashamount)
            bill.append(cash)
        for a in bill:
            totalbill += a
        print("Total Bill:", totalbill)
        oldorder = database.child('Users').child(
            logedInUser['localId']).child('order').get().val()
        for i in order:
            oldorder.append(i)
        # oldorder.append(order)
        if (oldorder[0][0] == 'Empty'):
            oldorder.pop(0)
        database.child('Users').child(
            logedInUser['localId']).child('order').set(oldorder)
        order = database.child('Users').child(
            logedInUser['localId']).child('cart').set(list)
        sendEmail(user['email'], "Order Confirmation", "Your order has been placed successfully.\n\nOrder Date: {}\nOrder Time: {}\n\nTotal Bill with Free Delivery 🚚: {} $ ".format(
            (date.today()).strftime("%B %d, %Y"), (datetime.now()).strftime("%H:%M:%S"), totalbill))
        return cart(request, "Your Order Has Been Placed.")
    return render(request, 'order/order.html')


def signUp(request):
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']
        a = [['Empty', 'Empty']]
        try:
            user = auth.create_user_with_email_and_password(email, password)
            userInfo = {
                'name': name,
                'email': email,
                'cart': a,
                'order': a
            }
            database.child('Users').child(user['localId']).set(userInfo)
            return render(request, 'signup-login/signin-login.html')
        except Exception as e:
            e = json.loads(e.args[1])
            emsg = e["error"]["message"]
            return render(request, 'signup-login/signin-login.html', {'err': emsg})
    return render(request, 'signup-login/signin-login.html')


def signIn(request):
    global logedInUser, user, template, phonebrand, phonename
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            logedInUser = user
            user = database.child('Users').child(user['localId']).get().val()
            if template == 'addtocart':
                return specs(request, phonebrand, phonename, 0)
            elif template == 'blogs':
                return blogs(request)
            elif template == 'cart':
                return cart(request)
            return home(request)
        except Exception as e:
            e = json.loads(e.args[1])
            emsg = e["error"]["message"]
            return render(request, 'signup-login/signin-login.html', {'err': emsg})
    return render(request, 'signup-login/signin-login.html')


def signOut(request):
    global logedInUser, user, template
    logedInUser = None
    user = None
    if template == 'blogs':
        return blogs(request)
    return home(request)


def home(request):
    global user
    if user:
        return render(request, 'home/index.html', {'userr': user})
    return render(request, 'home/index.html')


def compare(request):
    if user:
        return render(request, 'compare/compare.html', {'userr': user})
    return render(request, 'compare/compare.html')


def brandPhones(request, brand):
    context = {'brand': brand}
    if user:
        context['userr'] = user
    return render(request, 'brandPhones/brandPhones.html', context)


def sendEmail(toemail, msg1, msg2):
    send_mail(msg1, msg2, 'muhammadali427336@gmail.com',
              [toemail], fail_silently=False)
