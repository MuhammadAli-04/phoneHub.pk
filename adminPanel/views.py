from django.shortcuts import render
from firebase import Firebase
from firebase_admin import db as dbms, storage as storage, auth as authAdmin
import firebase_admin
import json
from django.core.mail import send_mail
from Phones.views import auth, database, dbStorage
from datetime import date, datetime
# Create your views here.


cred_obj = firebase_admin.credentials.Certificate(
    "C:\\Users\\muham\\Downloads\\PhoneHub\\Project\\service-account-file.json")
default_app = firebase_admin.initialize_app(cred_obj, {
    'storageBucket': 'demodb-38d29.appspot.com'
})

user = None
logedInUser = None


def dispatchOrder(request, uid):
    context = {}

    if user:
        context['userr'] = user
        if uid != "null":
            try:
                dispatchedOrders = [
                    database.child('Users').child(uid).child('name').get().val(), database.child('Users').child(uid).child('order').get().val()]
                dO = database.child('dispatchedOrders').get().val()

                dO.append(dispatchedOrders)
                if dO[0][0] == 'Empty':
                    dO.pop(0)
                database.child('dispatchedOrders').set(dO)
                #
                database.child('Users').child(uid).child(
                    'order').set([['Empty', 'Empty']])
                uemail = database.child('Users').child(
                    uid).child('email').get().val()
                sendEmail(uemail, "Order Dispatched", "Your order is on the way 🚚.\n\nOrder Date: {}\nOrder Time: {}$ ".format(
                    (date.today()).strftime("%B %d, %Y"), (datetime.now()).strftime("%H:%M:%S")))
            except Exception as e:
                e = json.loads(e.args[1])
                context['err'] = e["error"]["message"]
    context['disOrders'] = database.child('dispatchedOrders').get().val()
    return render(request, 'admin/dispatched/dispatched.html', context)


def orders(request):
    context = {}
    if user:
        context['userr'] = user
        return render(request, 'admin/orderedPhone/orderedPhone.html', context)


def adminHome(request):
    global user, logedInUser
    user = None
    logedInUser = None
    return render(request, 'admin/home/home.html')


def dashboard(request):
    global user, logedInUser
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            logedInUser = user
            user = database.child('Admin').child(user['localId']).get().val()
            return render(request, 'admin/dashboard/dashboard.html', {'userr': user})
        except Exception as e:
            e = json.loads(e.args[1])
            emsg = e["error"]["message"]
            return render(request, 'admin/home/home.html', {'err': emsg})
    if user:
        return render(request, 'admin/dashboard/dashboard.html', {'userr': user})


def allPhones(request, brand):
    context = {'brand': brand}
    if user:
        context['userr'] = user
        return render(request, 'admin/allPhones/allPhones.html', context)


def specs(request, brand, name):
    mobile = database.child("Brands").child(brand).child(name).get().val()
    crousal = database.child("Crousal").child(brand).child(name).get().val()
    context = {'mobile': mobile, 'crousal': crousal}
    if user:
        context['userr'] = user
        return render(request, 'admin/specs/specs.html', context)


def addPhoneInfo(request):
    if request.method == 'POST':
        name = addPhone(request)
        return render(request, 'addPhone/addPhone.html', {'userr': user})
    if user:
        return render(request, 'addPhone/addPhone.html', {'userr': user})


def sendEmail(toemail, msg1, msg2):
    send_mail(msg1, msg2, 'muhammadali427336@gmail.com',
              [toemail], fail_silently=False)


def func(request, display):
    phonedisplay = ''
    digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', 'x']
    for a in display:
        if a in digit:
            phonedisplay += a
    return phonedisplay


def addPhone(request):
    phone = {
        'Brand': request.POST['Brand'],
        'Name': request.POST['Name'],
        'Launch': {'Announced': request.POST['Announced'],
                   'Status': request.POST['Status']},
        'Network': {'Technology': request.POST['Technology']},
        'Build': {'Dimensions': request.POST['Dimensions'],
                  'Weight': request.POST['Weight'],
                  'Sims': request.POST['Sims']},
        'Display': {'Type': request.POST['Type'],
                    'Size': request.POST['Size'],
                    'Resolution': request.POST['Resolution']},
        'Platform': {'OS': request.POST['OS'],
                     'Chipset': request.POST['Chipset'],
                     'CPU': request.POST['CPU']},
        'Camera': {'Front': request.POST['Front'],
                   'Rear': request.POST['Rear']},
        'Memory': {'Ram': request.POST['Ram'],
                   'Rom': request.POST['Rom']},
        'Battery': {'Capacity': request.POST['Capacity'],
                    'Charging': request.POST['Charging']},
        'Sensors': {'Authentications': request.POST['Authentications'],
                    'Extras': request.POST['Extras']},
        'Colors': {'Available': request.POST['Available']},
        'Price': {'USD': request.POST['USD']},
        'ImageURL': 'here',
    }

    display = phone['Display']['Size']
    phonedisplay = func(request, display)
    dimensions = phone['Build']['Dimensions']
    phonedimension = func(request, dimensions)
    frontcamera = phone['Camera']['Front']
    rearcamera = phone['Camera']['Rear']
    battery = phone['Battery']['Capacity']
    phonebattery = func(request, battery)
    batterytype = phone['Battery']['Capacity']
    phonebatterytype = ''
    for a in batterytype:
        if a not in phonebattery:
            phonebatterytype += a
    type = ''
    mah = ['m', 'A', 'h']
    for a in phonebatterytype:
        if a not in mah:
            type += a
    chipset = phone['Platform']['Chipset']
    ram = phone['Memory']['Ram']
    crousalphone = {
        'display': phonedisplay,
        'dimensions': phonedimension,
        'frontcamera': frontcamera,
        'rearcamera': rearcamera,
        'battery': phonebattery,
        'type': type,
        'chipset': chipset,
        'ram': ram
    }
    # Image ka url get krne k liye-------------
    ImageUrls = []
    bucket = storage.bucket()
    user = auth.sign_in_with_email_and_password(
        "arham@gmail.com", "arham123")
    fileName = list(bucket.list_blobs(prefix=("Phones/" + phone['Name'])))
    for i in fileName:
        ImageUrls.append(dbStorage.child(i.name).get_url(user['idToken']))
    # --------------------------------------------------------
    phone['ImageURL'] = ImageUrls
    database.child('Brands').child(
        phone['Brand']).child(phone['Name']).set(phone)
    database.child('Crousal').child(phone['Brand']).child(
        phone['Name']).set(crousalphone)
    return request.POST['Name']


def newAdmin(request):
    global user
    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        password = request.POST['password']
        try:
            user = auth.create_user_with_email_and_password(email, password)
            userInfo = {
                'name': name,
                'email': email,
                'password': password,
            }
            database.child('Admin').child(user['localId']).set(userInfo)
            return render(request, 'admin/newAdmin/newAdmin.html', {'userr': user, 'err': "Added Successfully"})
        except Exception as e:
            e = json.loads(e.args[1])
            emsg = e["error"]["message"]
            return render(request, 'admin/newAdmin/newAdmin.html', {'err': emsg})
    if user:
        return render(request, 'admin/newAdmin/newAdmin.html', {'userr': user})
