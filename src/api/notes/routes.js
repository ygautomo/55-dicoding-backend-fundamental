const routes = (handler) => [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.postNoteHandler, // postNoteHandler hanya menerima dan menyimpan "satu" note
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.getNotesHandler, // getNotesHandler mengembalikan "banyak" note
  },
  {
    method: 'GET',
    path: '/notes/{idNotes}',
    handler: handler.getNoteByIdHandler, // getNoteByIdHandler mengembalikan "satu" note
  },
  {
    method: 'PUT',
    path: '/notes/{idNotes}',
    handler: handler.putNoteByIdHandler, // putNoteByIdHandler hanya menerima dan mengubah "satu" note
  },
  {
    method: 'DELETE',
    path: '/notes/{idNotes}',
    handler: handler.deleteNoteByIdHandler, // deleteNoteByIdHandler hanya menerima dan menghapus "satu" note
  },
];

module.exports = routes;
