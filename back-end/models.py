from config import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)