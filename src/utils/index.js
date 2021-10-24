const mapDBToModel = ({
  id_notes,
  title,
  body,
  tags,
  created_at,
  updated_at,
}) => ({
  idNotes: id_notes,
  title,
  body,
  tags,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = { mapDBToModel };
