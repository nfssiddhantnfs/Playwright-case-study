import { test, expect } from "@playwright/test";

const baseURL = "https://reqres.in/api";

const userDetails = {
  name: "Jack",
  job: "leader",
};

test("API Automation", async ({ request }) => {
  // Create user
  const postResponse = await request.post(`${baseURL}/users`, {
    data: userDetails,
  });

  expect(postResponse.status()).toBe(201);

  const postResponseJson = await postResponse.json();
  const userId = postResponseJson.id;

  // Get user
  const getRes = await request.get(`${baseURL}/users/${userId}`);
  expect(getRes.status()).toBe(200);

  const fetchedData = await getRes.json();
  expect(fetchedData.data.id).toBe(Number(userId));

  // Update user
  const updateRes = await request.put(`${baseURL}/users/${userId}`, {
    data: {
      name: "Jane",
    },
  });

  expect(updateRes.status()).toBe(200);

  const updateData = await updateRes.json();
  expect(updateData.name).toBe("Jane");
});