from flask import Flask, jsonify;
import datetime
import mysql.connector

app = Flask(__name__)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="iloveutuffy123",
  database="products_db"
)

mycursor = mydb.cursor(dictionary=True)

@app.route('/data', methods=['GET'])
def get_data():
    mycursor.execute("select * from products")
    productList  = mycursor.fetchall()
    return jsonify(productList)

if __name__ == '__main__':
    app.run(debug=True)

