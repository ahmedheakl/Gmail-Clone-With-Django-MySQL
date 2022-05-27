# Gmail-Clone-With-Django-MySQL - Project Overview

A gmail clone app built using Django (python framework) for the backend, SQL-Lite for the database, and HTML, CSS, Javascript for the frontend. The website handle user requests using APIs and store their data and emails using MySQL schema.
_Note: this website was built as an assignment for CS50 web development course_

## How to Use

- Clone this repository into your PC
- Start the server by writing `python manage.py runserver` into your terminal
- In order to manipulate the database:
  - Modify the model schema in `models.py` file
  - Track the migrations by writing `python manage.py migrate` into the terminal
  - Apply the migrations by writing `python manage.py makemigrations <app_name>` into the terminal

## Project Structure and Smaples

This a single-application (named _mail_) project implemented using django framework. The application consists of multiple views for login, sending emails, receiving emails. SQL database is used to store user data and emails implemented as models (user model and mail model).

Here are some samples for mail sending and receiving process:

<p align="center">
  <img width="400" height="300" src="https://github.com/ahmedheakl/Gmail-Clone-With-Django-MySQL/blob/main/imgs/Composing%20Sample.png">
  <img width="400" height="300" src="https://github.com/ahmedheakl/Gmail-Clone-With-Django-MySQL/blob/main/imgs/Email%20Sample.png">
</p>
