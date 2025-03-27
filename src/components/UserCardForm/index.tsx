import './UserCardForm.scss';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImagePreview from '@assets/icons/preview.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@library/Button';
import Typography from '@library/Typography';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addNewUser, getFilteredUsers } from '@store/slices/users';
import { newUserSchema } from '@utils/schema';
import Image from 'next/image';

export const UserCardForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    const allUsers = useAppSelector(getFilteredUsers);

    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(newUserSchema),
    });

    const onSubmit = handleSubmit(data => {
        if (!imagePreview) {
            setError('image', { message: 'Image is required' });
            return;
        }
        if (allUsers.find(user => user.email === data.email)) {
            setError('email', { message: 'Email already exists' });
            return;
        }
        dispatch(
            addNewUser({
                ...data,
                id: 0,
                image: imagePreview || '',
                birthDate: data.dob,
                age: Number(data.age),
            }),
        );
        reset();
        onSuccess();
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 300);
    });

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setValue('image', e.target.files);
                const reader = new FileReader();
                reader.onload = () => setImagePreview(reader.result as string);
                reader.readAsDataURL(file);
            }
        },
        [setValue],
    );

    return (
        <form className="user-card" onSubmit={onSubmit}>
            <Typography type="h3" weight="semibold" text="Add New User" color="black" as="h3" />
            <div className="image-upload">
                <label htmlFor="file-input">{imagePreview ? <Image src={imagePreview} alt="Profile" unoptimized={true} width={120} height={120} /> : <ImagePreview />}</label>
                <input id="file-input" type="file" accept="image/*" {...register('image')} onChange={handleImageUpload} />
                {errors.image && <Typography type="caption" weight="regular" text={errors.image.message} color="red" id="error_message" />}
            </div>

            <div className="user-info">
                <input type="text" placeholder="First Name" {...register('firstName')} />
                {errors.firstName && <Typography type="caption" weight="regular" text={errors.firstName.message} color="red" id="error_message" />}
                <input type="text" placeholder="Last Name" {...register('lastName')} />
                {errors.lastName && <Typography type="caption" weight="regular" text={errors.lastName.message} color="red" id="error_message" />}
                <input type="email" placeholder="Email" {...register('email')} />
                {errors.email && <Typography type="caption" weight="regular" text={errors.email.message} color="red" id="error_message" />}
                <input type="tel" placeholder="Phone" {...register('phone')} />
                {errors.phone && <Typography type="caption" weight="regular" text={errors.phone.message} color="red" id="error_message" />}
                <input type="date" {...register('dob')} placeholder="Date of Birth" onFocus={e => (e.target.type = 'date')} onBlur={e => (e.target.type = 'text')} />
                {errors.dob && <Typography type="caption" weight="regular" text={errors.dob.message} color="red" id="error_message" />}
                <input type="tel" {...register('age')} placeholder="Age" minLength={2} maxLength={2} />
                {errors.age && <Typography type="caption" weight="regular" text={errors.age.message} color="red" id="error_message" />}
                <Button type="submit" label={<Typography type="p3" weight="semibold" text="Save" color="white" />} />{' '}
            </div>
        </form>
    );
};
