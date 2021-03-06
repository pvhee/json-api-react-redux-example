import fetch from 'isomorphic-fetch';
import normalize from 'json-api-normalizer';

// const API_ROOT = 'https://phoenix-json-api-example.herokuapp.com/api';
// const API_ROOT = 'https://pr-11-hyg3z3i-ymbo3koy3v3dm.eu.platform.sh/en/jsonapi/node/article?_format=json&include=field_article_body,field_article_teaser_image&fields[paragraph--paragraph_arte_video]=field_paragraph_program_id&fields[paragraph--paragraph_text]=field_paragraph_body&fields[node--article]=langcode,title,field_article_subtitle,field_article_body,field_article_teaser_image&fields[file--file]=filename,url,filesize';
const API_ROOT = 'https://pr-11-hyg3z3i-ymbo3koy3v3dm.eu.platform.sh/en/jsonapi/node/article?_format=json&include=field_article_body,field_article_teaser_image&fields[paragraph--paragraph_arte_video]=field_paragraph_program_id&fields[paragraph--paragraph_text]=field_paragraph_body&fields[node--article]=langcode,title,field_article_subtitle,field_article_body,field_article_teaser_image&fields[paragraph--paragraph_text_image]=field_paragraph_body, field_paragraph_image&fields[paragraph--paragraph_arte_collection]=field_paragraph_collection_id';

export const API_DATA_REQUEST = 'API_DATA_REQUEST';
export const API_DATA_SUCCESS = 'API_DATA_SUCCESS';
export const API_DATA_FAILURE = 'API_DATA_FAILURE';
export const SERVER_ROOT = 'https://pr-11-hyg3z3i-ymbo3koy3v3dm.eu.platform.sh/';

function callApi(endpoint, options = {}) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl, options)
    .then(response => response.json()
      .then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        // console.log(fullUrl);
        // console.log(json);
        // console.log(endpoint);
        // console.log(normalize(json, { endpoint }));

        return Object.assign({}, normalize(json, { endpoint }));
      }),
    );
}


export const CALL_API = Symbol('Call API');

export default function (store) {
  return function nxt(next) {
    return function call(action) {
      const callAPI = action[CALL_API];

      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      let { endpoint } = callAPI;
      const { options } = callAPI;

      if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
      }

      if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
      }

      const actionWith = (data) => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
      };

      next(actionWith({ type: API_DATA_REQUEST, endpoint }));

      return callApi(endpoint, options || {})
        .then(
          response => next(actionWith({ response, type: API_DATA_SUCCESS, endpoint })),
          error => next(actionWith({ type: API_DATA_FAILURE, error: error.message || 'Something bad happened' })),
        );
    };
  };
}
