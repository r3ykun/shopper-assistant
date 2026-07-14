import { database } from "./database";

export function seedDatabase() {
  database.execSync(`
    INSERT OR IGNORE INTO Stores
    (id, name, shortName, category)
    VALUES
      (1,'SM Supermarket','SM','Supermarket'),
      (2,'Puregold','Puregold','Supermarket'),
      (3,'Robinsons Supermarket','Robinsons','Supermarket'),
      (4,'Mercury Drug','Mercury','Pharmacy'),
      (5,'7-Eleven','7-Eleven','Convenience'),
      (6,'Alfamart','Alfamart','Convenience'),
      (7,'ACE Hardware','ACE','Hardware'),
      (8,'Handyman','Handyman','Hardware'),
      (9,'MR. D.I.Y.','MR. D.I.Y.','Hardware'),
      (10,'Watsons Pharmacy','Watsons','Pharmacy'),
      (11,'DALI Everyday Grocery','DALI','Grocery'),
      (12,'Rey-Sal Supermarket','Rey-Sal','Supermarket'),
      (13,"Uncle John's","Uncle John's",'Convenience')
  `);

  console.log("✅ Seed data inserted.");
}