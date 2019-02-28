import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000'
})

/*
const target = {};
const handler = {
  get(target, name) {
    return axios.get(name);
  }
};
const api = new Proxy(target, handler);
api.posts.then(console.log);
*/

const target = {}
const handler = {
  get(target, name) {
    return Object.assign(
      {},
      ['get', 'delete', 'head'].reduce(
        (o, method) =>
          Object.assign({}, o, {
            [method](url = '', params = {}) {
              if (typeof url === 'object') {
                params = url
                url = ''
              }
              return instance[method](name + url, { params })
            }
          }),
        {}
      ),
      ['post', 'put', 'patch'].reduce(
        (o, method) =>
          Object.assign({}, o, {
            [method](url = '', body = {}, params = {}) {
              if (typeof url === 'object') {
                params = body
                body = url
                url = ''
              }
              return instance[method](name + url, body, { params })
            }
          }),
        {}
      )
    )
  }
}

const api = new Proxy(target, handler)
const response = ({ data }) => console.log(data)

/*
api.posts.get().then(response);

const body = {
  title: 'test',
  body: 'lorem ipsum',
  userId: 10,
};

api.posts.post(body).then(response);

look to https://codeburst.io/why-to-use-javascript-proxy-5cdc69d943e3

*/
