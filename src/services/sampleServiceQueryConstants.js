module.exports = {
  DEV_INSERTION_QUERY:
    "INSERT INTO sample_table(sample_field_1, sample_field_2, sample_field_3) values(?, ?, ?);",
  DEV_SELECT_BY_ID_QUERY: "SELECT * FROM sample_table WHERE id=?;",
  DEV_UPDATION_QUERY:
    "UPDATE sample_table SET sample_field_1=?, sample_field_2=?, sample_field_3=? WHERE id=?;",
  DEV_DELETION_QUERY: "DELETE FROM sample_table WHERE id=?;",
  PROD_INSERTION_QUERY:
    "INSERT INTO sample_table(sample_field_1, sample_field_2, sample_field_3) values($1, $2, $3);",
  PROD_SELECT_BY_ID_QUERY: "SELECT * FROM sample_table WHERE id=$1;",
  PROD_UPDATION_QUERY:
    "UPDATE sample_table SET sample_field_1=$1, sample_field_2=$2, sample_field_3=$3 WHERE id=$4;",
  PROD_DELETION_QUERY: "DELETE FROM sample_table WHERE id=$1;",
  SELECT_ALL_QUERY: "SELECT * FROM sample_table;"
};
