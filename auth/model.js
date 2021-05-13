var db = require("../config/dbConfig.js");

module.exports.getClient = function (clientID, clientSecret, callback){

  //create the the client out of the given params.
  //It has no functional role in grantTypes of type password
  const client = {
      clientID,
      clientSecret,
      grants: ['password','refresh_token'],
      redirect_uri: ''
  }

  callback(null, client);
}

module.exports.grantTypeAllowed = function(clientID, grantType, callback) {
    if (grantType === 'password') {
      callback(null, true);
  } else {
      callback('Invalid grant type!', false);
  }
}

/*
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
  console.log('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = \''+bearerToken+'\'')
  return db.pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE access_token = \''+bearerToken+'\'')
    .then(function(results) {
      var token = results[0];
      let expiresOn = new Date(token[0].access_token_expires_on)
      console.log(expiresOn)
      return {
        accessToken: token[0].access_token,
        client: {id: token[0].client_id},
        accessTokenExpiresAt: expiresOn,
        user: {id: token[0].user_id}, // could be any object
      };
    });
};

/**
 * Get refresh token.
 */

 module.exports.getRefreshToken = function *(bearerToken) {
  return db.pool.query('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id FROM oauth_tokens WHERE refresh_token = $1', [bearerToken])
    .then(function(result) {
      return result.rowCount ? result.rows[0] : false;
    });
};

/*
 * Get user.
 */

module.exports.getUser = function *(username, password) {
    return db.pool.query('SELECT id FROM users WHERE username = \''+username+'\' AND password = \''+ password+'\'')
      .then(function(result) {
        return result.length ? result[0] : false;
      });
  };

  module.exports.saveToken = function *(token, client, user) {
    let accessExpiresOn = token['accessTokenExpiresAt'].getFullYear()+'-'+(token['accessTokenExpiresAt'].getMonth()+1)+"-"+token['accessTokenExpiresAt'].getDate()+" "+token['accessTokenExpiresAt'].getHours()+":"+token['accessTokenExpiresAt'].getMinutes()+":"+token['accessTokenExpiresAt'].getSeconds()
    let refreshExpiresOn = token['refreshTokenExpiresAt'].getFullYear()+'-'+(token['refreshTokenExpiresAt'].getMonth()+1)+"-"+token['refreshTokenExpiresAt'].getDate()+" "+token['refreshTokenExpiresAt'].getHours()+":"+token['refreshTokenExpiresAt'].getMinutes()+":"+token['refreshTokenExpiresAt'].getSeconds()
    console.log(accessExpiresOn)
    return db.pool.query('INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id)'+
      'VALUES (\''+token.accessToken+'\', \''+accessExpiresOn+'\', \''+client['clientID']+'\', \''+token.refreshToken+'\',\''+refreshExpiresOn+'\',\''+user[0].id+'\')')
      .then(function(result) {
        if(result.length){
          return {
            accessToken:token.accessToken,
            client:client['clientID'],
            user:user[0].id
          }
        } else{
          return false;
        }
    });
  };