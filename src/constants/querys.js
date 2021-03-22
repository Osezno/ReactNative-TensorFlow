export const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
        trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
        },
            (error) => {
                reject(error);
            });
    });
});

export const createTable = () => {
    db.transaction((txn) => {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='rutinasCompletadas'",
            [],
            (tx, res) => {
                if (res.rows.length == 0) {
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS rutinasCompletadas(id INTEGER PRIMARY KEY AUTOINCREMENT, created bigint NOT NULL, minutos INTEGER NOT NULL, tipo TEXT NOT NULL)',
                        []
                    );
                }
            }
        );
    })
    Alert.alert('SQLite Database and Table Successfully Created...');
};

export const DeleteQuery = async () => {
    let deleteQuery = await ExecuteQuery('DELETE FROM rutinasCompletadas WHERE id = ?', [4])
}

export const Query = async () => {
    let selectQuery = await ExecuteQuery("SELECT * FROM rutinasCompletadas", []);
    var rows = selectQuery.rows;

    for (let i = 0; i < rows.length; i++) {
        var item = rows.item(i);
        console.log(item);
    }
    // let selectQuery = await ExecuteQuery("SELECT * FROM sqlite_master;", []);
    // let rows = selectQuery.rows;
    // for (let i = 0; i < rows.length; i++) {
    //     var item = rows.item(i);
    //     console.log(item);
    // }
}

export const InsertQuery = async () => {
    let singleInsert = await ExecuteQuery("INSERT INTO rutinasCompletadas(created, minutos, tipo) VALUES (?, ?, ?)", [Date.now(), 15, "Cardio"]);
}