# Jajanken - password manager

Jajanken is a password manager that allows you to store information about accounts that you are using.
It uses Django REST Framework for backend and React JS for frontend.

**Currently, not deployed anywhere.**


> This project is nothing serious and is mainly used for me to learn DRF and React.
There are a lot of missing features that are required to be a full-fledged password manager.
Go look somewhere else if you need something serious.


## Features:
* Full CRUD functionality;
* Full authentication functionality with JWT token authentication;
* View buttons that allows the user to hide or see the information;
* Copy buttons for easy copy of the selected field;
* History page that tracks your CRUD operations.

## Tools:

* Languages: Python, JavaScript
* Frameworks: [Django REST Framework](https://www.django-rest-framework.org/), [React](https://react.dev/)
* Database: sqlite for local usage
* Icons: [FontAwesome](https://fontawesome.com/)

## Run Locally

1. Clone the project:

```bash
  git clone git@github.com:dandr94/psw-manager-jajanken.git
```

2. Go to the project directory:

```bash
  cd psw-manager-jajanken/jajanken/src/
```

3. Create a `.env` and add the following environment variables to your `.env`:</br>
```SECRET_KEY=your_secret_key_here```</br>
```DEBUG=your_debug_setting_here```</br>
```ALLOWED_HOSTS=your_allowd_hosts_here```</br>
_Or don't create .env and add them directly in **settings.py**_


4. Install backend dependencies:

```bash
  pip install -r requirements.txt
```

5. Start the Django server:

```bash
  python manage.py runserver
```

6. Open new terminal and navigate to the frontend directory:

```bash
  cd psw-manager-jajanken/jajanken/src/frontend/
```

7. Install frontend dependencies:

```bash
  npm install
```

8. Start the Node server:

```bash
  npm start
```

### Ports
* Backend server runs on port `8000`
* Frontend server runs on port `3000`</br>
``http://localhost:8000/3000``


## Preview
Check the preview folder for pictures and gif of the design.