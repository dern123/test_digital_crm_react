const pool = require("../../db/pool");


module.exports = {
    get: async(req, res) => {
        try{
            await pool.query(
                'SELECT * FROM company',
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(200).json({status: true, data: results.rows});
                }
            )
        }catch (e) {
            console.log(e);
            res.statys(500);
        }
    }
}  