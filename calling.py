import os, time
from flask import Flask, request, jsonify, json
from flask_cors import cross_origin

app = Flask(__name__)

available = []

@app.route('/calling', methods=['POST'])
@cross_origin()
def calling():
    to_, from_ = request.args.get('to'), request.args.get('from')
    to_wav, from_wav = to_ + '.webm', from_ + '.webm'
    response = {'available': []}
    
    if from_ not in (x[0] for x in available):
        available.append([from_, time.time(), from_wav])

    for tup in (x for x in available if x[0] != from_):
        if time.time() - tup[1] > 10:
            available.remove(tup)
            if os.path.isfile(tup[2]):
                os.remove(tup[2])
            continue
        else:
            tup[1] = time.time()
            response['available'].append(tup[0])

    if to_:
        with open(to_wav, 'ab') as to_file:
            to_file.write(request.get_data())

    if from_:
        if os.path.isfile(from_wav):
            with open(from_wav, 'rb') as from_file:
                response['data'] = [b for b in from_file.read()]
            os.remove(from_wav)

    return jsonify(response)


app.run(host='127.0.0.1', debug=True)
