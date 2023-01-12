
# "Companies" :{
#       "Samsung" :{
#     		".indexOn" : ["price"],    
#       }
#     }


phone = {
        'Launch' : {'Announced' : 'here', 
            'Status' : 'here'},
        'Network' : {'Technology': 'here'},
        'Build' : {'Dimenshion' : 'here',
            'Weight': 'here',
            'Sims' : 'here'},
        'Display': {'Type' : 'here',
            'size': 'here',
            'Resolution' : 'here'},
        'Platform' : {'OS' : 'here',
            'Chipset' : 'here',
            'CPU' : 'here'},
        'Camera' : {'Front' : 'here',
            'Rare' : 'here'},
        'Battery' : {'Capacity' : 'here',
            'Charging' : 'here'},
        'Sensors' : {'Authentications' : 'here',
            'Extras' : 'here'},
        'Colors' : {'Available' : 'here'},
        'Price' : {'PKR' : 'here'},
        'ImageURL' : 'here',
    }



    # fss = FileSystemStorage()
        # file = fss.save(fileName.name, fileName)
        # file_url = fss.url(fileName)
        # bucket = storage.bucket()
        # blob = bucket.blob(phoneName)
        # blob.upload_from_filename(file_url)
        # print("your file url", blob.public_url)


# fileName = "C:\\Data\\5th semester\\AI Lab\\Project\\Project\\static\\iPhone14ProMax.png"
#     bucket = storage.bucket()
#     blob = bucket.blob('Iphone14')
#     blob.upload_from_filename(fileName)
#     print("your file url", blob.public_url)
#     phone['ImageURL'] = blob.public_url
#     database.child('Brands').child('Apple').child(phone['Name']).set(phone)

    # addPhone()
    # mob = dbms.reference('/Companies/Samsung/')
    # mob = mob.order_by_child('price').get()
    # print('\n')
    # for i in mob:
    #     print(i)
    # print('\n')