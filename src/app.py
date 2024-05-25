from flask import Flask, jsonify;
import datetime

app = Flask(__name__)

productList = [
  {
    "name": "Grey Hoodie",
    "price": 25,
    "image1": "https://m.media-amazon.com/images/I/61CgP6eiVvL._SX679_.jpg",
    "image2": "https://m.media-amazon.com/images/I/71teqMgkimL._SY741_.jpg",
    "soldOut": False,
  },
  {
    "name": "Black Hoodie",
    "price": 20,
    "image1":
      "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/g/v/w/m-003-auraworld-original-imagjkj3hwumg8hu.jpeg?q=70",
    "image2":
      "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/g/q/l/s-003-auraworld-original-imagjkj3kbnyqfhp.jpeg?q=70",
    "soldOut": True,
  },
  {
    "name": "Light-Green Sweatshirt",
    "price": 22,
    "image1":
      "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/k/k/k/s-hd-109-solid-thalasi-original-imagw6u4knzn2xys.jpeg?q=70",
    "image2":
      "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/p/z/o/s-whd-204-thalasi-original-imagw5p97xgnxgan.jpeg?q=70",
    "soldOut": False,
  },
  {
    "name": "Purple Sweatshirt",
    "price": 30,
    "image1": "https://m.media-amazon.com/images/I/61x80IBNAQL._SY741_.jpg",
    "image2": "https://m.media-amazon.com/images/I/61HmsZfSq1L._SY550_.jpg",
    "soldOut": False,
  },
  {
    "name": "Brown Fleece Sweatshirt",
    "price": 25,
    "image1": "https://m.media-amazon.com/images/I/61GKymVG6TL._SX569_.jpg",
    "image2": "https://m.media-amazon.com/images/I/71S3I6m0A7L._SX569_.jpg",
    "soldOut": True,
  },
  {
    "name": "Dark Blue Sweatshirt",
    "price": 15,
    "image1": "https://m.media-amazon.com/images/I/41rPFtRyUvL._SX569_.jpg",
    "image2": "https://m.media-amazon.com/images/I/71+rc05gXlL._SY741_.jpg",
    "soldOut": False,
  },
]

@app.route('/data', methods=['GET'])
def get_data():
    return jsonify(productList)

if __name__ == '__main__':
    app.run(debug=True)

