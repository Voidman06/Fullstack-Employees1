import db from "../client.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  await db.query(`
    INSERT INTO employees (name, birthday, salary)
    VALUES
      ('Johnny Boba', '1984-07-16', 102440),
      ('Cleo Racco', '1992-11-07', 98020),
      ('Dawk Nite', '2001-07-18', 89230),
      ('Bobby Bobbi', '1995-10-22', 81500),
      ('Misster Oppenheimer', '2003-07-21', 76190),
      ('Luna Shore', '1988-03-14', 95000),
      ('Felix Crane', '1999-12-01', 88320),
      ('Rina Gold', '1994-08-09', 104600),
      ('Toby Marsh', '1987-05-28', 79800),
      ('Kira Solen', '2000-02-11', 84550);
  `);
}
