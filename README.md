# BKZ-Rent-Backend
### Backend Repository for BKZ Rent Web or Mobile

---------------------------------------------------------------
```
AUTH ENDPOINT
```

| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| POST | /login          | Login User           |
| POST | /forgotPassword | Forgot Password User |
| POST | /emailVerify    | Email Verify User    |
---------------------------------------------------------------
```
USERS ENDPOINT
```
| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| GET    | /users          | Get All Users           |
| GET    | /users/:userId  | Search User By userId   |
| GET    | /profile        | Get Profile User        |
| POST   | /users/register | Get Profile User        |
| PATCH  | /profile/update | Update Profile          |
| PATCH  | /users/:userId  | Update User for Admin   |
| DELETE | /users/:userId  | Delete User for Admin   |
---------------------------------------------------------------
```
VEHICLES ENDPOINT
```
| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| GET    | /vehicles                    | Get, Filter and Search Vehicles |
| GET    | /vehicles/search/:vehicleId  | Get Vehicle by Id               |
| GET    | /popular                     | Get Popular Vehicles            |
| GET    | /popularintown               | Get Popular in Town Vehicles    |
| GET    | /lastweekvehicles            | Get Last Week Vehicles          |
| POST   | /vehicles & /vehicles/create | Create new Vehicles             |
| PATCH  | /vehicles/edit/:vehicleId    | Update new Vehicles             |
| DELETE | /vehicles/:vehicleId         | Delete Vehicles                 |
---------------------------------------------------------------
```
FAVORITE ENDPOINT
```
| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| GET    | /favorite             | Get All FAvorite By Admin  |
| GET    | /favorite/search/:id  | Search Favorite            |
| GET    | /favorite/my-favorite | Get My FAvorite for User   |
| POST   | /favorite             | create Favorite User       |
| DELETE | /favorite/:id         | Delete Favorite User       |
---------------------------------------------------------------
```
CATEGORY ENDPOINT
```
| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| GET    | /category                     | Get All Category By Admin  |
| GET    | /category/:categoryId         | Search Category            |
| POST   | /category/create              | create Category            |
| PATCH  | /category/update/:categoryId  | Update Category            |
| DELETE | /category/delete/:categoryId  | Delete Category User       |
---------------------------------------------------------------
```
HISTORY TRANSACTION ENDPOINT
```
| METHOD | API  | DESCRIPTION |
| :------------ |:---------------:| -----:|
| GET    | /history                           | Get All History By Admin    |
| GET    | /myHistory                         | Get My History              |
| GET    | /myHistory/search/:historyId       | Search My History           |
| GET    | /myHistory/search/rating/:vehicleId| Search Rating My History    |
| PATCH  | /myHistory/rating/:historyId       | Update Rating My History    |
| DELETE | /myHistory/:historyId              | Update Rating My History    |
| POST   | /history                           | create Transaction          |
| DELETE | /myHistory/:historyId              | Delete My History User      |

---------------------------------------------------------------

## 📌 How To Install?

- Clone This Repo

```
git clone https://github.com/HirasParasian/BKZ-Rent-Backend/
```
---------------------------------------------------------------
- Install

```
npm install
```

- Start Backend

```
npm run dev
```
---------------------------------------------------------------
- Clone and Install Repo Web or Mobile
---------------------------------------------------------------

- Mobile Repo

```
git clone https://github.com/HirasParasian/BKZ-Rent-Mobile/
```
---------------------------------------------------------------
-Web Repo
```
git clone https://github.com/HirasParasian/BKZ-Rent-Web-App/
```
---------------------------------------------------------------
