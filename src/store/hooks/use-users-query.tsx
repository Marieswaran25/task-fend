import { User } from '@Customtypes/users';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_SERVICE_URL } from '@/config';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_SERVICE_URL }),
    endpoints: builder => ({
        getUsers: builder.query<{ users: Array<User> }, string | void>({
            query: () => `/users`,
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
export default usersApi;
