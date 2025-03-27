'use client';
import './home.scss';
import colors from '@theme/colors.module.scss';

import React, { useEffect } from 'react';
import Profile from '@assets/icons/profile.svg';
import Refresh from '@assets/icons/refresh.svg';
import Users from '@assets/icons/users.svg';
import SearchBar from '@components/SearchBar';
import { UserCardForm } from '@components/UserCardForm';
import { UsersTable } from '@components/usersTable';
import { Button } from '@library/Button';
import { Loader } from '@library/Loader';
import { Modal } from '@library/Modal';
import Typography from '@library/Typography';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useGetUsersQuery } from '@store/hooks/use-users-query';
import { getCurrentSearchTerm, getFilteredUsers, setUsers } from '@store/slices/users';

export const HomeLayout = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const { data, status, refetch } = useGetUsersQuery();
    const users = useAppSelector(getFilteredUsers);
    const searchTerm = useAppSelector(getCurrentSearchTerm);
    const dispatch = useAppDispatch();

    const closeModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        if (status === 'fulfilled' && data) {
            dispatch(setUsers(data.users));
        }
    }, [status, data, dispatch]);

    if (status === 'pending') return <Loader borderTopColor={colors.LightCeruleanBlue} />;
    if (status === 'rejected') return <Typography type="h1" weight="semibold" text="Something went wrong" color="black" as="h6" id="unknown-error" />;
    return (
        <div className="home-layout">
            <div className="title-wrapper">
                <Users />
                <Typography type="h1" weight="semibold" text="User Management" color="black" as="h1" />
            </div>
            <SearchBar />

            <div className="results-text">
                <Refresh onClick={() => refetch()} />
                <Typography
                    type="h3"
                    weight="semibold"
                    text={searchTerm ? (users.length > 0 ? `Results for "${searchTerm}"` : `No results for "${searchTerm}"`) : `Showing ${users.length} records`}
                    color="black"
                    as="h3"
                />
            </div>

            <UsersTable />

            <div className="add-more-btn">
                <Button
                    label={<Typography type="p2" weight="regular" text="Add New User" color="white" as="span" />}
                    backgroundColor={colors.LightCeruleanBlue}
                    onClick={() => setOpenModal(true)}
                    id="add-user-btn"
                    rightIcon={Profile}
                    backgroundColorOnHover={colors.C5}
                />
            </div>

            {openModal && (
                <Modal
                    isCloseIcon
                    handleModal={() => {
                        closeModal();
                    }}
                >
                    <UserCardForm onSuccess={() => closeModal()} />
                </Modal>
            )}
        </div>
    );
};
