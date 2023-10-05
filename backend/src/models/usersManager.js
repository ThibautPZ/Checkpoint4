const AbstractManager = require("./AbstractManager");

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async findOneByEmail(email) {
    return this.database.query(
      `select id, firstname, lastname, address, postal code, city, phone_number_1, phone_number_2, email, password, account_date, user_types_id from ${this.table} where email = ?`[
        email
      ]
    );
  }
}

module.exports = UsersManager;
