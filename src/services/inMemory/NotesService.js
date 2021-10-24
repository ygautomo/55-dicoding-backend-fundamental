const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const idNotes = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, idNotes, createdAt, updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.idNotes === idNotes).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return idNotes;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(idNotes) {
    const note = this._notes.filter((n) => n.idNotes === idNotes)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(idNotes, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.idNotes === idNotes);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(idNotes) {
    const index = this._notes.findIndex((note) => note.idNotes === idNotes);
    if (index === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
