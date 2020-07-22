function dbQuery(con) {
    const Person = {
        insertUser: async (user) => {
            const INSERT_QUERY = `INSERT INTO persons (username, password)
      VALUES ('${user.username}','${user.password}')`;
            return new Promise((resolve, reject) => {
                con.query(INSERT_QUERY, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) reject(err);
                    // if there is no error, you have the result
                    resolve(result);
                });
            })
        },
        updateUser: async (personId, refreshToken) => {
            const UODATE_QUERY = `UPDATE persons SET refresh_token='${refreshToken}' WHERE personid=${personId}`;
            return new Promise((resolve, reject) => {
                con.query(UODATE_QUERY, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) reject(err);
                    // if there is no error, you have the result
                    resolve(result);
                });
            })
        },
        getUserById: (userId) => {
            console.log('---------> userId ',userId);
            const FETCH_QUERY = `SELECT * FROM persons WHERE personid=${userId}`;
            return new Promise((resolve, reject) => {
                con.query(FETCH_QUERY, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) reject(err);
                    // if there is no error, you have the result
                    resolve(result);
                });
            })
        },
        getUserByRefreshToken: (refreshToken) => {
            const FETCH_QUERY = `SELECT * FROM persons WHERE refresh_token=${refreshToken}`;
            return new Promise((resolve, reject) => {
                con.query(FETCH_QUERY, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) reject(err);
                    // if there is no error, you have the result
                    resolve(result);
                });
            })
        },
        getUserByCreds: (user) => {
            const FETCH_QUERY = `SELECT personid,username FROM persons WHERE username='${user.username}' && password='${user.password}'`;
            return new Promise((resolve, reject) => {
                con.query(FETCH_QUERY, function (err, result, fields) {
                    // if any error while executing above query, throw error
                    if (err) reject(err);
                    // if there is no error, you have the result
                    resolve(result);
                });
            })
        }
    }
    return Person;
}
module.exports = dbQuery;

