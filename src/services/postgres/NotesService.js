const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { mapDBToModel } = require('../../utils');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async addNote({ title, body, tags }) {
    const idNotes = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO tblnotes VALUES($1, $2, $3, $4, $5, $6) RETURNING id_notes',
      values: [idNotes, title, body, tags, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id_notes) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id_notes;
  }

  async getNotes() {
    const result = await this._pool.query('SELECT * FROM tblnotes');
    return result.rows.map(mapDBToModel);
  }

  async getNoteById(idNotes) {
    const query = {
      text: 'SELECT * FROM tblnotes WHERE id_notes = $1',
      values: [idNotes],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editNoteById(idNotes, { title, body, tags }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE tblnotes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id_notes = $5 RETURNING id_notes',
      values: [title, body, tags, updatedAt, idNotes],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
  }

  async deleteNoteById(idNotes) {
    const query = {
      text: 'DELETE FROM tblnotes WHERE id_notes = $1 RETURNING id_notes',
      values: [idNotes],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = NotesService;
