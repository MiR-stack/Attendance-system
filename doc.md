attendance system api created for students attendance. admin will create attendance sheet for limited time and
students can perticipate one time .

auth requset:

for create user account
    -route: http://www.localhost:8080/api/v1/auth/registration [pos]
    -required body: name, unique email,password , unique roll no.

it will be create a user and genarate a jwt token.

for login user:
    -route:http://www.localhost:8080/api/v1/auth/login [post]
    -required body: email,password

it will be genarate a jwt token

user request:

for get user by id:
    -route:http://www.localhost:8080/api/v1/user?id=userid [get]
    -required query params:id = userid
    -need bearer token authentication

for update user information:
    -route:http://www.localhost:8080/api/v1/user [patch]

    if user :
        - user only able to update his name.
    if admin:
        -admin can change any user information
        -if admin change user account status active then it will create a profile for user

for delete user:
    -route http://www.localhost:8080/api/v1/user?id=userid [delete]
    -required query params:id = userid
    -need bearer token authentication
    -user all data will be deleted (profile, user account, all attendances history)

frofile reqeust:

for find profile:
    -route: http://www.localhost:8080/api/v1/user/profile?id=user id [get]
    -required query params:id = userid
    -need bearer token authentication

for update profile:
    -route: http://www.localhost:8080/api/v1/user/profile?id=user id [patch]
    -required query params:id = userid
    -body: phone or avatar
    -need bearer token authentication




