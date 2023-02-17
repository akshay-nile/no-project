import os, time
from flask import Flask, request, jsonify, json
from flask_cors import cross_origin

app = Flask(__name__)

available = set()

@app.route('/calling', methods=['POST'])
@cross_origin()
def calling():
    to_ = request.args.get('to')
    from_ = request.args.get('from')

    available.add(from_)
    response = {'available': [x for x in available if x != from_]}

    if to_:
        with open(to_ + '.wav', 'ab') as to_file:
            to_file.write(request.get_data())

    if from_ :
        if os.path.isfile(from_ + '.wav'):
            with open(from_ + '.wav', 'rb') as from_file:
                response['data'] = [b for b in from_file.read()]
            os.remove(from_ + '.wav')

    return jsonify(response)


app.run(host='127.0.0.1', debug=True)
