'use client';

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Ошибка регистрации', {
                description: e instanceof Error ? e.message : 'Не удалось создать аккаунт.'
            });
        }
    };

    return (
        <>
            <h1 className="form-title">Регистрация и настройка</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Полное имя"
                    placeholder="Имя Фамилия"
                    register={register}
                    error={errors.fullName}
                    validation={{ required: 'Введите имя', minLength: 2 }}
                />

                <InputField
                    name="email"
                    label="Электронная почта"
                    placeholder="example@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Введите электронную почту',
                        pattern: /^\w+@\w+\.\w+$/,
                        message: 'Введите корректный email'
                    }}
                />

                <InputField
                    name="password"
                    label="Пароль"
                    placeholder="Введите надежный пароль"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Введите пароль', minLength: 8 }}
                />

                <CountrySelectField
                    name="country"
                    label="Страна"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="Инвестиционная цель"
                    placeholder="Выберите цель инвестирования"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Уровень риска"
                    placeholder="Выберите уровень риска"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Предпочитаемая отрасль"
                    placeholder="Выберите отрасль"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Создание аккаунта...' : 'Начать инвестировать'}
                </Button>

                <FooterLink
                    text="Уже есть аккаунт?"
                    linkText="Войти"
                    href="/sign-in"
                />
            </form>
        </>
    );
};

export default SignUp;
