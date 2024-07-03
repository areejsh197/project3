const pool = require('./connection'); // Import the connection pool

function getFormData(pageName, callback) {
  const query = `
    SELECT 
      f.form_id, f.title as form_title,
      s.section_id, s.title as section_title,
      ss.subsection_id, ss.title as subsection_title, ss.subtitle as subsection_subtitle,
      fld.field_id, fld.name as field_name, fld.type as field_type, fld.placeholder as field_placeholder, fld.default_value as field_default_value
    FROM forms f
    JOIN sections s ON f.id = s.form_id
    JOIN subsections ss ON s.id = ss.section_id
    JOIN fields fld ON ss.id = fld.subsection_id
    WHERE f.form_id = ?`;

  pool.query(query, [pageName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null);
      return;
    }

    if (results.length > 0) {
      const form = {
        id: results[0].form_id,
        title: results[0].form_title,
        sections: []
      };

      results.forEach(row => {
        let section = form.sections.find(s => s.id === row.section_id);
        if (!section) {
          section = {
            id: row.section_id,
            title: row.section_title,
            subsections: []
          };
          form.sections.push(section);
        }

        let subsection = section.subsections.find(ss => ss.id === row.subsection_id);
        if (!subsection) {
          subsection = {
            id: row.subsection_id,
            title: row.subsection_title,
            subtitle: row.subsection_subtitle,
            fields: []
          };
          section.subsections.push(subsection);
        }

        subsection.fields.push({
          id: row.field_id,
          name: row.field_name,
          type: row.field_type,
          placeholder: row.field_placeholder,
          defaultValue: row.field_default_value
        });
      });

      callback(null, form);
    } else {
      callback(new Error("Form not found"), null);
    }
  });
}

module.exports = {
  getFormData
};
