module.exports = {
    configure(app) {
      app.use('/api/leads', require("./leads.routes"));
      app.use('/api/statistic', require("./statistic.routes"));
      app.use('/api/country', require("./country.routes"));
      app.use('/api/company', require("./company.routes"));
    }
};