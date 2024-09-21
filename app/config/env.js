

const env = {
  database: 'baseddenis',
  username: 'baseddenis_user',
  password: 'zAV0OKlMtsSpbbKrS2GRf7w7ZpPlPBhp',
//  host: 'dpg-crngd5d6l47c73afrsug-a.oregon-postgres.render.com',
  host: 'dpg-crngd5d6l47c73afrsug-a',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;