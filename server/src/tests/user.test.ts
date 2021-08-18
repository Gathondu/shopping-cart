import { gql, GraphQLClient } from 'graphql-request';
import { createConnection, getConnection } from 'typeorm';
import faker from 'faker';
import { Users } from '../entities/users';

describe('USER INTERACTIONS', () => {
  let client: GraphQLClient;
  const addUserMutation = gql`
    mutation AddUser($firstName: String!, $lastName: String!) {
      createUser(firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
        cartId
      }
    }
  `;
  const allUsersQuery = gql`
    query {
      users {
        id
      }
    }
  `;

  beforeAll(async () => {
    client = new GraphQLClient(`${process.env.URL}`);
    await createConnection();
  });

  afterAll(() => {
    getConnection().close();
  });

  test('should create user', async () => {
    const variables = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
    const response = await client.request(addUserMutation, variables);
    expect(response.createUser).toEqual({ ...variables, id: '1', cartId: 1 });
    const users = await Users.find();
    expect(users).toHaveLength(1);
  });

  test('should update user', async () => {
    const user = await Users.findOne();
    const mutation = gql`
      mutation UpdateUser($id: ID!, $firstName: String, $lastName: String) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
          id
          firstName
          lastName
        }
      }
    `;
    const variables = {
      id: `${user?.id}`,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
    await client.request(mutation, variables);
    const updatedUser = await Users.findOne(user?.id);
    expect(updatedUser?.firstName).toEqual(variables.firstName);
    expect(updatedUser?.lastName).toEqual(variables.lastName);
  });

  describe('should get', () => {
    test('all users', async () => {
      await Promise.all(
        [
          {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          },
          {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          },
          {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
          },
        ].map(async (user) => await client.request(addUserMutation, user)),
      );
      const response = await client.request(allUsersQuery);
      expect(response.users).toHaveLength(4);
    });

    test('one user', async () => {
      const user = await Users.findOne(3);
      const query = gql`
        query user($id: ID!) {
          user(id: $id) {
            id
            firstName
            lastName
            cartId
          }
        }
      `;
      const response = await client.request(query, { id: user?.id });
      expect(response.user).toEqual({
        id: `${user?.id}`,
        firstName: user?.firstName,
        lastName: user?.lastName,
        cartId: user?.cartId,
      });
    });
  });

  test('should delete user', async () => {
    const mutation = gql`
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
          id
          firstName
          lastName
          cartId
        }
      }
    `;
    const user = await Users.findOne(2);
    const response = await client.request(mutation, { id: 2 });
    expect(response.deleteUser).toEqual({
      id: `${user?.id}`,
      firstName: user?.firstName,
      lastName: user?.lastName,
      cartId: user?.cartId,
    });
    const allUsers = await client.request(allUsersQuery);
    expect(allUsers.users).toHaveLength(3);
  });
});
