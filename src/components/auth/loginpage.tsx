import React, { useState } from 'react'
import RegistereForm from '../custom/form'
import CustomButton from '../custom/button'
import { Image } from 'antd';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';


export default function LoginComp() {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [validation, setValidation] = useState({
        email: '',
        password: '',
    });
    const [loader, setLoader] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async () => {
        setLoader(true);
        let newErrors = { email: '', password: '' };
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        setValidation(newErrors);
        if (newErrors.email || newErrors.password) {
            setLoader(false);
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                setValidation({
                    email: '',
                    password: data.message || 'Invalid email or password',
                });
                return;
            }
            dispatch(loginSuccess({
                user: data.user,
                token: data.token,
            }));

            localStorage.setItem(
                'auth',
                JSON.stringify({
                    user: data.user,
                    token: data.token,
                }))
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setLoader(false)
        }
    }

    return (
        <div>
            <div className='flex flex-col items-center justify-center gap-4 w-full '>
                <div className=''>
                    <Image src="../../../public/logo.png" height={100} width={100} className='rounded-2xl' />
                </div>
                <div className='flex flex-col gap-4 w-1/3'>
                    <div className=''>
                        <RegistereForm
                            label="Email"
                            placeHolder="Enter your Email"
                            className="w-full mb-4"
                            value={formData.email}
                            onChange={(e) => { handleChange(e) }}
                            type="email"
                            name="email"
                        />
                        {
                            validation.email && <div className='text-sm mt-1'>{validation.email}</div>
                        }
                    </div>
                    <div>
                        <RegistereForm
                            label="Password"
                            placeHolder="Enter your Password"
                            className="w-full mb-4"
                            value={formData.password}
                            onChange={(e) => { handleChange(e) }}
                            type="password"
                            name="password"
                        />
                        {
                            validation.password && <div className=' text-sm mt-1'>{validation.password}</div>
                        }
                    </div>
                </div>
                <CustomButton
                    text='Login'
                    className='w-1/6 '
                    onClick={handleSubmit}
                    loader={loader}
                />
            </div>
        </div>
    )
}
