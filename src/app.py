from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the database URL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:iloveutuffy123@localhost:3306/products_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image1 = db.Column(db.String(255))
    image2 = db.Column(db.String(255))
    soldOut = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'image1': self.image1,
            'image2': self.image2,
            'soldOut': self.soldOut
        }

# Function to insert initial product data
def insert_initial_data():
    productList = []
    

    for product in productList:
        new_product = Product(
            name=product["name"],
            price=product["price"],
            image1=product["image1"],
            image2=product["image2"],
            soldOut=product["soldOut"]
        )
        db.session.add(new_product)
    db.session.commit()

with app.app_context():
    db.create_all()
    insert_initial_data()

@app.route('/data', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])

@app.route('/data', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(
        name=data['name'],
        price=data['price'],
        image1=data['image1'],
        image2=data['image2'],
        soldOut=data['soldOut']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.to_dict()), 201

if __name__ == '__main__':
    app.run(debug=True)
