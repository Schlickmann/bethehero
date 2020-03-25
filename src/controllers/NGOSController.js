const crypto = require('crypto');
const connection = require('../database/connection');

class NGOSController {
  async store(req, res) {
    const { name, email, whatsapp, city, state, country } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    const response = await connection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state,
      country
    });

    return res.json({ id });
  }
}

module.exports = new NGOSController();