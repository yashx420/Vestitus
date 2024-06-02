from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="iloveutuffy123",
    database="products_db"
)

mycursor = mydb.cursor(dictionary=True)

@app.route('/data', methods=['GET'])
def get_data():
    mycursor.execute("SELECT * FROM products")
    productList = mycursor.fetchall()
    return jsonify(productList)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    mycursor.execute("SELECT id, username FROM users WHERE username = %s AND password = %s", (username, password))
    user = mycursor.fetchone()

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    mycursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing_user = mycursor.fetchone()

    if existing_user:
        return jsonify({"message": "Username already exists"}), 409

    mycursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    mydb.commit()

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')
    mycursor.execute("""
        SELECT p.id, p.name, p.price, p.image1, c.size FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = %s
    """, (user_id,))
    cart_items = mycursor.fetchall()
    return jsonify(cart_items)

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    user_id = data.get('user_id')
    product_id = data.get('product_id')
    size = data.get('size')

    mycursor.execute("INSERT INTO carts (user_id, product_id, size) VALUES (%s, %s, %s)", (user_id, product_id, size))
    mydb.commit()
    return jsonify({"message": "Item added to cart"}), 201

@app.route('/cart', methods=['DELETE'])
def remove_from_cart():
    data = request.json
    user_id = data.get('user_id')
    product_id = data.get('product_id')

    mycursor.execute("DELETE FROM carts WHERE user_id = %s AND product_id = %s", (user_id, product_id))
    mydb.commit()
    return jsonify({"message": "Item removed from cart"}), 200

if __name__ == '__main__':
    app.run(debug=True)
