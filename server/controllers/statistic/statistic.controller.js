const pool = require("../../db/pool");


module.exports = {
    get: async(req,res) => {
        try{
            await pool.query(
                'SELECT channel_traffic.company_id, ' +
                'company.company_name, ' +
                'COUNT(DISTINCT installs) AS leads_count, ' +
                'SUM(COALESCE(installs, 0)) AS installs, ' +
                'SUM(COALESCE(impressions, 0)) AS impressions, ' +
                'SUM(COALESCE(ctr, 0)) AS ctr, ' +
                'SUM(COALESCE(reattrebutions, 0)) AS reattrebutions, ' +
                'SUM(COALESCE(daus, 0)) AS daus, ' +
                'SUM(COALESCE(waus, 0)) AS waus, ' +
                'SUM(COALESCE(ecpi, 0)) AS ecpi, ' +
                'SUM(COALESCE(ccr, 0)) AS ccr, ' +
                'SUM(COALESCE(roas, 0)) AS roas, ' +
                'SUM(COALESCE(maus, 0)) AS maus, ' +
                'SUM(COALESCE(revenues, 0)) AS revenues, ' +
                'SUM(COALESCE(spead, 0)) AS spead, ' +
                'SUM(COALESCE(events, 0)) AS events, ' +
                'SUM(COALESCE(other, 0)) AS other ' +
                'FROM channel_traffic ' +
                'JOIN company ON channel_traffic.company_id = company.company_id ' +
                'GROUP BY channel_traffic.company_id, company.company_name',
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  res.status(200).json({ status: true, data: results.rows });
                }
              );
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    },

    getById: async(req,res) => {
        try{
            const company_id = parseInt(req.params.id);
            await pool.query(
                'SELECT channel_traffic.company_id, ' +
                'company.company_name, ' +
                'COUNT(DISTINCT installs) AS leads_count, ' +
                'SUM(COALESCE(installs, 0)) AS installs, ' +
                'SUM(COALESCE(impressions, 0)) AS impressions, ' +
                'SUM(COALESCE(ctr, 0)) AS ctr, ' +
                'SUM(COALESCE(reattrebutions, 0)) AS reattrebutions, ' +
                'SUM(COALESCE(daus, 0)) AS daus, ' +
                'SUM(COALESCE(waus, 0)) AS waus, ' +
                'SUM(COALESCE(ecpi, 0)) AS ecpi, ' +
                'SUM(COALESCE(ccr, 0)) AS ccr, ' +
                'SUM(COALESCE(roas, 0)) AS roas, ' +
                'SUM(COALESCE(maus, 0)) AS maus, ' +
                'SUM(COALESCE(revenues, 0)) AS revenues, ' +
                'SUM(COALESCE(spead, 0)) AS spead, ' +
                'SUM(COALESCE(events, 0)) AS events, ' +
                'SUM(COALESCE(other, 0)) AS other ' +
                'FROM channel_traffic ' +
                'JOIN company ON channel_traffic.company_id = company.company_id ' +
                'WHERE channel_traffic.company_id = $1 ' +
                'GROUP BY channel_traffic.company_id, company.company_name', 
                [company_id],
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  res.status(200).json({status: true, data: results.rows});
                }
            );
        }catch(e){
            console.log(e);
            res.status(500);
        }
    },

    filters: async(req, res) => {
        try{
            let { country, company, days, compare } = req.headers;
            country = parseInt(country);
            if (isNaN(country)) country = -1;  // Set a default value if parsing fails
            
            company = parseInt(company);
            if (isNaN(company)) company = -1;  // Set a default value if parsing fails

            compare = parseInt(compare);
            if (isNaN(compare)) compare = -1;
            if (compare == 1){
                compare = 'CASE WHEN $1 != -1 THEN channel_traffic.country_id = CAST($1 AS INTEGER) ELSE true END '
            }
            else {
                compare = 'CASE WHEN $1 != -1 THEN company.country_id = CAST($1 AS INTEGER) ELSE true END '
            }
            
            await pool.query(
                'SELECT channel_traffic.company_id, ' +
                'company.company_name, ' +
                'COUNT(DISTINCT installs) AS leads_count, ' +
                'SUM(COALESCE(installs, 0)) AS installs, ' +
                'SUM(COALESCE(impressions, 0)) AS impressions, ' +
                'SUM(COALESCE(ctr, 0)) AS ctr, ' +
                'SUM(COALESCE(reattrebutions, 0)) AS reattrebutions, ' +
                'SUM(COALESCE(daus, 0)) AS daus, ' +
                'SUM(COALESCE(waus, 0)) AS waus, ' +
                'SUM(COALESCE(ecpi, 0)) AS ecpi, ' +
                'SUM(COALESCE(ccr, 0)) AS ccr, ' +
                'SUM(COALESCE(roas, 0)) AS roas, ' +
                'SUM(COALESCE(maus, 0)) AS maus, ' +
                'SUM(COALESCE(revenues, 0)) AS revenues, ' +
                'SUM(COALESCE(spead, 0)) AS spead, ' +
                'SUM(COALESCE(events, 0)) AS events, ' +
                'SUM(COALESCE(other, 0)) AS other ' +
                'FROM channel_traffic ' +
                'JOIN company ON channel_traffic.company_id = company.company_id ' +
                'JOIN country ON channel_traffic.country_id = country.country_id ' +
                'WHERE ' +
                   `${compare}`+
                  'AND ' +
                  'CASE WHEN $2 != -1 THEN company.company_id = CAST($2 AS INTEGER) ELSE true END ' +
                'GROUP BY channel_traffic.company_id, company.company_name',
                [country, company],
                (error, results) => {
                  if (error) {
                    throw error;
                  }
                  res.status(200).json({ status: true, data: results.rows });
                }
            )
        } catch (e) {
            console.log(e);
            res.status(500); 
        }
    },

    search: async(req, res) => {
        try{
            const searchValue = req.params.search;
            await pool.query(
                'SELECT channel_traffic.company_id, ' +
                'company.company_name, ' +
                'COUNT(DISTINCT installs) AS leads_count, ' +
                'SUM(COALESCE(installs, 0)) AS installs, ' +
                'SUM(COALESCE(impressions, 0)) AS impressions, ' +
                'SUM(COALESCE(ctr, 0)) AS ctr, ' +
                'SUM(COALESCE(reattrebutions, 0)) AS reattrebutions, ' +
                'SUM(COALESCE(daus, 0)) AS daus, ' +
                'SUM(COALESCE(waus, 0)) AS waus, ' +
                'SUM(COALESCE(ecpi, 0)) AS ecpi, ' +
                'SUM(COALESCE(ccr, 0)) AS ccr, ' +
                'SUM(COALESCE(roas, 0)) AS roas, ' +
                'SUM(COALESCE(maus, 0)) AS maus, ' +
                'SUM(COALESCE(revenues, 0)) AS revenues, ' +
                'SUM(COALESCE(spead, 0)) AS spead, ' +
                'SUM(COALESCE(events, 0)) AS events, ' +
                'SUM(COALESCE(other, 0)) AS other ' +
                'FROM channel_traffic ' +
                'JOIN company ON channel_traffic.company_id = company.company_id ' +
                'WHERE channel_traffic.company_id = $1 OR company.company_name ILIKE $2 ' +
                'GROUP BY channel_traffic.company_id, company.company_name', 
                [ parseInt(searchValue)?searchValue:-1, searchValue],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(200).json({status: true, data: results.rows});
                }
            );
        } catch (e) {
            console.log(e);
            res.status(500); 
        }
    },

    getCharts: async(req, res) => {
        try{
            await pool.query(
                "SELECT  " +
                "channel_traffic.company_id,  " +
                "company.company_name, " +
                "COUNT(DISTINCT installs) AS leads_count, " +
                "SUM(COALESCE(installs, 0)) AS installs, " +
                "SUM(COALESCE(impressions, 0)) AS impressions, " +
                "SUM(COALESCE(ctr, 0)) AS ctr, " +
                "SUM(COALESCE(reattrebutions, 0)) AS reattrebutions, " +
                "SUM(COALESCE(daus, 0)) AS daus, " +
                "SUM(COALESCE(waus, 0)) AS waus, " +
                "SUM(COALESCE(ecpi, 0)) AS ecpi, " +
                "SUM(COALESCE(ccr, 0)) AS ccr, " +
                "SUM(COALESCE(roas, 0)) AS roas, " +
                "SUM(COALESCE(maus, 0)) AS maus, " +
                "SUM(COALESCE(revenues, 0)) AS revenues, " +
                "SUM(COALESCE(spead, 0)) AS spead, " +
                "SUM(COALESCE(events, 0)) AS events, " +
                "SUM(COALESCE(other, 0)) AS other, " +
                "ARRAY_AGG(DISTINCT installs) AS leads_count_array, " +
                "ARRAY_AGG(COALESCE(installs, 0)) AS installs_array, " +
                "ARRAY_AGG(COALESCE(impressions, 0)) AS impressions_array, " +
                "ARRAY_AGG(COALESCE(ctr, 0)) AS ctr_array, " +
                "ARRAY_AGG(COALESCE(reattrebutions, 0)) AS reattrebutions_array, " +
                "ARRAY_AGG(COALESCE(daus, 0)) AS daus_array, " +
                "ARRAY_AGG(COALESCE(waus, 0)) AS waus_array, " +
                "ARRAY_AGG(COALESCE(ecpi, 0)) AS ecpi_array, " +
                "ARRAY_AGG(COALESCE(ccr, 0)) AS ccr_array, " +
                "ARRAY_AGG(COALESCE(roas, 0)) AS roas_array, " +
                "ARRAY_AGG(COALESCE(maus, 0)) AS maus_array, " +
                "ARRAY_AGG(COALESCE(revenues, 0)) AS revenues_array, " +
                "ARRAY_AGG(COALESCE(spead, 0)) AS spead_array, " +
                "ARRAY_AGG(COALESCE(events, 0)) AS events_array, " +
                "ARRAY_AGG(COALESCE(other, 0)) AS other_array " +
                "FROM channel_traffic  " +
                "JOIN company ON channel_traffic.company_id = company.company_id " +
                "GROUP BY channel_traffic.company_id, company.company_name; ",
    //             "SELECT " +
    //             "channel_traffic.company_id, " + 
    //             "company.company_name, " +
    //             "ARRAY_AGG(DISTINCT installs) AS leads_count, " +
    //             "ARRAY_AGG(COALESCE(installs, 0)) AS installs, " +
    //             "ARRAY_AGG(COALESCE(impressions, 0)) AS impressions, " +
    //             "ARRAY_AGG(COALESCE(ctr, 0)) AS ctr, " +
    //             "ARRAY_AGG(COALESCE(reattrebutions, 0)) AS reattrebutions, " +
    //             "ARRAY_AGG(COALESCE(daus, 0)) AS daus, " +
    //             "ARRAY_AGG(COALESCE(waus, 0)) AS waus, " +
    //             "ARRAY_AGG(COALESCE(ecpi, 0)) AS ecpi, " +
    //             "ARRAY_AGG(COALESCE(ccr, 0)) AS ccr, " +
    //             "ARRAY_AGG(COALESCE(roas, 0)) AS roas, " +
    //             "ARRAY_AGG(COALESCE(maus, 0)) AS maus, " +
    //             "ARRAY_AGG(COALESCE(revenues, 0)) AS revenues, " +
    //             "ARRAY_AGG(COALESCE(spead, 0)) AS spead, " +
    //             "ARRAY_AGG(COALESCE(events, 0)) AS events, " +
    //             "ARRAY_AGG(COALESCE(other, 0)) AS other " +
    //             "FROM channel_traffic " +
    //             "JOIN company ON channel_traffic.company_id = company.company_id " +
    //             "GROUP BY channel_traffic.company_id, company.company_name",
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                    res.status(200).json({status: true, data: results.rows});
                }
            );
        } catch (e){
            console.log(e);
            res.status(500);
        }
    }    
}  