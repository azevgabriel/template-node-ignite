import { app } from "@shared/infra/http/app";
import request from "supertest";

import createConnection from "@shared/infra/typeorm/index";
import { Connection } from "typeorm";

import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

let connection: Connection;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);

    const id = uuidv4();
    await connection.query(`
      INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at) 
      VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXX' ,'now()')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category Supertest Description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("Category Supertest");
  });
});
