import { test, expect } from "@playwright/test";
import fs from "fs";

const baseURL = "https://reqres.in/api";

const userDetails = {
  name: "Jack",
  job: "leader",
};

test("API Automation", async ({ request }) => {
  //1. Create a new user, validate the http status code and retrieve user id
  const postResponse = await request.post(`${baseURL}/users`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
    data: userDetails,
  });

  expect(postResponse.status()).toBe(201);
  const postResponseJson = await postResponse.json();
  const userId = postResponseJson.id;
  console.log("User ID:", userId);

  //2. Get the created user details and validate the same
  const getRes = await request.get(`${baseURL}/users/${userId}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });
  expect([200]).toContain(getRes.status());
  if (getRes.status() == 200) {
    const fetchedData = await getRes.json();
    expect(fetchedData.name).toBe(userDetails.name);
    expect(fetchedData.job).toBe(userDetails.job);
  }

  // 3. Update User
  const updateRes = await request.put(`${baseURL}/users/${userId}`, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
    data: {
      name: "Jane",
    },
  });
  expect(updateRes.status()).toBe(200);
  const updateData = await updateRes.json();
  expect(updateData.name).toBe("Jane");
});
