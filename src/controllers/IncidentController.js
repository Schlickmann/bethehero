const connection = require('../database/connection');

class IncidentController {
  async store(req, res) {
    const { title, description, value } = req.body;
    const ngo_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({ title, description, value, ngo_id });

    return res.json({ id });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const incidents = await connection('incidents')
                              .limit(6)
                              .offset((page - 1) * 6)
                              .select('*');

    return res.json(incidents);
  }

  async delete(req, res) {
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    const incident = await connection('incidents')
                              .where('id', id)
                              .select('ngo_id')
                              .first();
    
    if (incident.ngo_id !== ngo_id) {
      return res.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

module.exports = new IncidentController();