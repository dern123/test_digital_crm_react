const pool = require("../../db/pool");


module.exports = {
    get: async(req,res) => {
        try{
            await pool.query('SELECT * FROM channel_traffic ' +
            'JOIN company ON channel_traffic.company_id = company.company_id ' +
            'JOIN country ON channel_traffic.country_id = country.country_id ' +
            'ORDER BY channel_traffic.channel_id, company.company_id, country.country_id ASC',
                (error, results) => {
                if (error) {
                    throw error;    
                }
                res.status(200).json({status: true, data: results.rows});
            });
        } catch (e) {

        }
    },

    create: async(req,res) => {
        try{
            const {name, count, current_cookie} = req.body;
            await pool.query(
                'INSERT INTO channel_traffic (name, count, current_cookie) VALUES ($1, $2, $3) RETURNING *', 
                [name, count, current_cookie], (error, results) => {
                if (error) {
                  throw error
                }
                res.status(201).send(`Channel added with ID: ${results.rows[0].id}`)
            })
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    },

    getById: async(req,res) => {
        const channel_id = parseInt(req.params.id)
      
        await pool.query('SELECT * FROM channel_traffic WHERE channel_id = $1', [channel_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json({status: true, data: results.rows});
        })
    },
      
    update: async(request, response) => {
        const channel_id = parseInt(request.params.id)
        const { name, count, current_cookie } = request.body
      
        await pool.query(
            'UPDATE channel_traffic SET name = $1, count = $2, current_cookie = $3 WHERE channel_id = $4',
            [name, count, current_cookie, channel_id],
            (error, results) => {
                if (error) {
                throw error
                }
                response.status(200).send(`Channel modified with ID: ${channel_id}`)
            }
        )
    },
      
    delete: async(request, response) => {
        const channel_id = parseInt(request.params.id)
      
        await pool.query('DELETE FROM channel_traffic WHERE channel_id = $1', [channel_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Channel deleted with ID: ${channel_id}`)
        })
    }
}  