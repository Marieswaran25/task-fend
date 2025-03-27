'use client';
import './usersTable.scss';

import React, { useEffect } from 'react';
import { Button } from '@library/Button';
import Typography from '@library/Typography';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetUsersQuery } from '@store/hooks/use-users-query';
import { deleteUserById, getFilteredUsers, setUsers } from '@store/slices/users';
import Image from 'next/image';

export const UsersTable = () => {
    const { data, status } = useGetUsersQuery();
    const dispatch = useAppDispatch();
    const users = useAppSelector(getFilteredUsers);

    useEffect(() => {
        if (status === 'fulfilled' && data) {
            dispatch(setUsers(data.users));
        }
    }, [status, data, dispatch]);
    return (
        <div className="usersTableContainer">
            <table className="usersTable" cellSpacing="0">
                <thead>
                    <tr>
                        {['Id', 'Image', 'First Name', 'Last Name', 'Age', 'Email', 'Phone', 'Birth Date', 'Actions'].map(field => (
                            <th key={field}>{field}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.image ? <Image src={user.image} alt={user.firstName} width={50} height={50} /> : 'None'}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.birthDate}</td>
                            <td>
                                <Button
                                    backgroundColor={'#d81d19'}
                                    type="button"
                                    label={
                                        <Typography
                                            type="p3"
                                            weight="semibold"
                                            text="Delete"
                                            color="white"
                                            onClick={() => {
                                                dispatch(deleteUserById(user.id));
                                            }}
                                        />
                                    }
                                />{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
