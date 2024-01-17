const Queue = require('bull');
const pool  = require('../db/pool');

// const initializeLeadProcessor = () => {
//   const queue = new Queue('leadQueue');

//   const processLead = async (job) => {
//     const leadData = job.data;
//     console.log("🚀 ~ file: process.js:9 ~ processLead ~ leadData:", leadData)
//     try {
//       await pool.query(`
//         INSERT INTO channel_traffic (country_id, company_id, installs, impressions, ctr, reattrebutions, daus, waus, ecpi, ccr, roas, maus, revenues, spead, events, other)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
//       `, [
//         leadData.country_id, leadData.company_id, leadData.installs,
//         leadData.impressions, leadData.ctr, leadData.reattrebutions,
//         leadData.daus, leadData.waus, leadData.ecpi, leadData.ccr,
//         leadData.roas, leadData.maus, leadData.revenues, leadData.spead,
//         leadData.events, leadData.other
//       ]);
//       console.log('Lead data inserted successfully:', leadData);
//     } catch (error) {
//       console.error('Error inserting lead data:', error.message);
//       throw error;
//     }
//   };

//   queue.process(processLead);

//   // Додаємо тестовий лід в чергу
//   return queue;
// };

const testLead = {

  country_id: Math.floor(Math.random() * 5) + 1,
  company_id: Math.floor(Math.random() * 12) + 1,
  installs: Math.floor(Math.random() * 100) + 1,
  impressions: Math.floor(Math.random() * 100) + 1,
  ctr: Math.floor(Math.random() * 1000) / 1000,
  reattrebutions: Math.floor(Math.random() * 100) + 1,
  daus: Math.floor(Math.random() * 100) + 1,
  waus: Math.floor(Math.random() * 100) + 1,
  ecpi: Math.floor(Math.random() * 100) + 1,
  ccr: Math.floor(Math.random() * 100) + 1,
  roas: Math.floor(Math.random() * 100) + 1,
  maus: Math.floor(Math.random() * 100) + 1,
  revenues: Math.floor(Math.random() * 1000) / 1000,
  spead: Math.floor(Math.random() * 1000) / 1000,
  events: Math.floor(Math.random() * 100) + 1, 
  other: Math.floor(Math.random() * 100) + 1
};
const initializeLeadProcessor = async () => {
  
  const leadData = testLead;
  try {
    await pool.query(`
    INSERT INTO channel_traffic (
      country_id, company_id, installs, impressions, ctr, reattrebutions, daus, waus,
      ecpi, ccr, roas, maus, revenues, spead, events, other
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);
  `, [
    leadData.country_id, leadData.company_id, leadData.installs,
    leadData.impressions, leadData.ctr, leadData.reattrebutions,
    leadData.daus, leadData.waus, leadData.ecpi, leadData.ccr,
    leadData.roas, leadData.maus, leadData.revenues, leadData.spead,
    leadData.events, leadData.other
  ]);
    console.log('Lead data inserted successfully:', leadData);
  } catch (error) {
    console.error('Error inserting lead data:', error.message);
    throw error;
  }
};
module.exports = { initializeLeadProcessor };
