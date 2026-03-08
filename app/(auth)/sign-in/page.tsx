'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Не удалось войти', {
                description: e instanceof Error ? e.message : 'Ошибка при входе в аккаунт.',
            });
        }
    };

    return (
        <>
            <h1 className="form-title">С возвращением</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Электронная почта"
                    placeholder="example@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Введите электронную почту',
                        pattern: /^\w+@\w+\.\w+$/,
                    }}
                />

                <InputField
                    name="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: 'Введите пароль',
                        minLength: 8,
                    }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Вход...' : 'Войти'}
                </Button>

                <FooterLink
                    text="Нет аккаунта?"
                    linkText="Создать аккаунт"
                    href="/sign-up"
                />
            </form>
        </>
    );
};

export default SignIn;
