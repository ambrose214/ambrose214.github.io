from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

from flask_heroku import Heroku

try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen

import json

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:a@localhost/pre-registration'
heroku = Heroku(app)
db = SQLAlchemy(app)
url=("https://dataclips.heroku.com/xycrpswqvwfvniznpazsdvjdmvkl-Names.json")

def get_jsonparsed_data(url):
    """
    Receive the content of ``url``, parse it as JSON and return the object.

    Parameters
    ----------
    url : str

    Returns
    -------
    dict
    """
    response = urlopen(url)
    data = response.read()#.decode("utf-8")
    return json.loads(data)

# Create our database model
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Name %r>' % self.name

# Set "homepage" to index.html
@app.route('/', methods=['GET', 'POST'])
def index():
    name = None
    names=get_jsonparsed_data(url)
    if request.method == 'POST':
        name = request.form['name']
        # Check that email does not already exist (not a great query, but works)
        if name =="!deleteAll" :
           db.session.query(User).delete()
           db.session.commit()
        if not db.session.query(User).filter(User.name == name).count():
            reg = User(name)
            db.session.add(reg)
            db.session.commit()
            return render_template('index.html', savedNames=names['values'])
           # return render_template('success.html')
    return render_template('index.html', savedNames=names['values'])



if __name__ == '__main__':
    app.debug = True
    app.run()

