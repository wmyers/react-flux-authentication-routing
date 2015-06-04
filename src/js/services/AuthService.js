import request from 'request';
import bluebird from 'bluebird';
import {LOGIN_URL, SIGNUP_URL} from '../constants/AppConstants';

class AuthService {

  login(username, password) {
    return new bluebird( (resolve, reject) => {
      request.post(
        {
          url: LOGIN_URL,
          body: {username, password},
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }

  signup(username, password, extra) {
    return new bluebird( (resolve, reject) => {
      request.post(
        {
          url: SIGNUP_URL,
          body: {username, password, extra},
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }

}

export default new AuthService();
