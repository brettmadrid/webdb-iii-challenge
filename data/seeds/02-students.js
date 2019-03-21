exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Ashley", cohort_id: 3 },
        { name: "Kseniya", cohort_id: 3 },
        { name: "Jamar", cohort_id: 3 }
      ]);
    });
};
