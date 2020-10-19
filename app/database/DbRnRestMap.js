import SQLite from 'react-native-sqlite-storage';
import constant from '../config/Constant';
class DbRnRestMap {

    static dbInstance = null;


    static getDbInstance() {
        if (this.dbInstance === null) {
            this.dbInstance = openDatabase();
        }
        return this.dbInstance;
    }

    static openDatabase() {
        this.dbInstance = SQLite.openDatabase(
            {
                name: constant.database.dbName,
                location: constant.database.dbLocation,
                createFromLocation: constant.database.createFromLocation,
            },
            () => {
                console.log('open sucessfully')
            },
            error => {
                console.log(error);
            }
        );
    }


    static closeDatabase() {
        if (this.dbInstance != null) {
            this.dbInstance.close()
        }
    }

    static insertApiData(apiData) {
        if (this.dbInstance != null) {
            this.dbInstance.transaction(function (tx) {
                tx.executeSql(
                    'SELECT * FROM AllRest WHERE url=?', [apiData.url],
                    (tx, results) => {
                        const rows = results.rows;
                        if (rows.length >= 1) {
                            tx.executeSql(
                                'UPDATE AllRest set url=?, response=? where url=?', 
                                [apiData.url,apiData.response,apiData.url],
                                (tx, results) => {
                                }
                            )
                        } else {
                            tx.executeSql(
                                'INSERT INTO AllRest (url, response) VALUES (?,?)',
                                [apiData.url,apiData.response],
                                (tx, results) => {
                                }
                            );
                        }
                    },function(error) {
                        console.log(error);

                    }
                )
            })
        }

    }

   

    static getApiData(url) {
        return new Promise((resolve, reject) => {
            if (this.dbInstance != null) {
                this.dbInstance.transaction(tx => {
                    tx.executeSql('SELECT * FROM  AllRest WHERE url=? ',
                        [url], (tx, results) => {
                            if(results.rows.length > 0 ){
                                const rows = results.rows;
                                let users = [];
    
                                for (let i = 0; i < rows.length; i++) {
                                    users.push({
                                        ...rows.item(i),
                                    });
                                }
                                resolve(JSON.parse(users[0].response).data)
                            }else{
                                resolve(0)
                            }
                            
                        });
                }, function (error) {
                    console.log(error)
                }, function () {

                });
            }
        })

    }


}
export default DbRnRestMap;