# data = {
#     'name': 'John',
#     'age': 30,
# }
# print(data['labib'] if 'labib' in data else 'not found')

inp = input('Enter your name: ')

match inp :
    case 'labib' :
        print('Hello labib')
    case 'john' :
        print('Hello john')
    case _ :
        print('Hello stranger')