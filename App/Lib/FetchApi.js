const SERVICE_ERR_MSG = 'Ошибка сервиса. Попробуйте позже';

const PreapareParams = (inputParams, outputParams) => {
    let parameters = [];
    Object.keys(inputParams).map(key => parameters.push({ name: key, value: inputParams[key], direction: 'input' }));
    outputParams.map(name => parameters.push({ name, direction: 'output' }));
    return { parameters };
}

export function AuthApi({ url, queryParams = {}, outputParams = [], methodType = 'POST', showModalError = false }) {
    return Fetch({ url: 'auth/' + url, queryParams });
}

export default function FetchApi({ url, queryParams = {}, outputParams = [], methodType = 'POST', showModalError = false }) {
    return Fetch({ url: 'api/' + url, queryParams, outputParams, methodType, showModalError })
}

function Fetch({ url, queryParams = {}, outputParams = [], methodType = 'POST', showModalError = false }) {
    var _method = methodType.toUpperCase();
    var _query = (_method === 'GET' && queryParams) ? ('?' + objToUrlParams(queryParams)) : '';
    var _url = _API_URL_ + url + _query;
    var _body = _method === 'GET' ? null : JSON.stringify(PreapareParams(queryParams, outputParams));


    return new Promise(function (resolve, reject) {
        var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        var xhr = new XHR();
        var isDone = false;

        xhr.open(_method, _url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.timeout = 120 * 1000;
        xhr.send(_body);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4 && !isDone) return;
            isDone = true;
            var json = null;
            try {
                var json = JSON.parse(xhr.responseText);
            }
            catch (e) {
                console.log('Caught error ' + e.name + ":" + e.message + "\n" + e.stack);
            }
            finally {
                if (xhr.status === 200 && json) {
                    resolve(json);
                }
                else {
                    reject(json);
                }
            }
        }

    });
}

const errorHandlers = {
    401: function () {
        location.pathname = _ROOT_URL_ + '/login';
    }
}


const objToUrlParams = function (obj) {
    var a = [];
    for (var f in obj) {
        if (obj[f] && obj.hasOwnProperty(f))
            a.push(f + '=' + obj[f]);
    }
    return a.join('&');
}

const cutApiMessage = function (str) {
    if (!str) return str
    return /^Operation failed. '.+'$/.test(str)
        ? str.substring(str.length - 1, 1).substring(18)
        : str;
}

