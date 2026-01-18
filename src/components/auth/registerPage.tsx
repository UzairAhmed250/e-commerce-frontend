import { Image } from 'antd';
import RegisterForm from '../custom/form';
import CustomButton from '../custom/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        phone: 0,
        password: '',
    });
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "phone" ? Number(value) : value, });
    }

    const handleSubmit = async () => {
        setLoader(true);
        try {
            const response = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            console.log(data);
            navigate('/login');
        } catch (error) {
            console.error("Error submitting form", error);
        } finally {
            setLoader(false)
        }
    }
    return (
        <>
            <div className='w-full! flex flex-col items-center justify-center gap-4'>
                <div className=''>
                    <Image src="../../../public/logo.png" height={100} width={100} className='rounded-2xl' />
                </div>
                <div className=''>
                    <div className='flex gap-2 items-center'>
                        <RegisterForm
                            label="First name"
                            placeHolder="Enter your first name"
                            className="w-full mb-4"
                            value={formData.firstName}
                            onChange={(e) => { handleChange(e) }}
                            type="text"
                            name="firstName"
                        />
                        <RegisterForm
                            label="Last name"
                            placeHolder="Enter your Lirst name"
                            className="w-full mb-4"
                            value={formData.lastName}
                            onChange={(e) => { handleChange(e) }}
                            type="text"
                            name="lastName"
                        />
                    </div>
                    <RegisterForm
                        label="Username"
                        placeHolder="Enter your Username"
                        className="w-full mb-4"
                        value={formData.userName}
                        onChange={(e) => { handleChange(e) }}
                        type="text"
                        name="userName"
                    />
                    <div className='flex gap-2 items-center'>
                        <RegisterForm
                            label="Email"
                            placeHolder="Enter your Email"
                            className="w-full mb-4"
                            value={formData.email}
                            onChange={(e) => { handleChange(e) }}
                            type="email"
                            name="email"
                        />
                        <RegisterForm
                            label="Phone"
                            placeHolder="+92 300 1234567"
                            className="w-full mb-4"
                            value={formData.phone}
                            onChange={(e) => { handleChange(e) }}
                            type="number"
                            name="phone"
                        />
                    </div>
                    <RegisterForm
                        label="Password"
                        placeHolder="Enter your Password"
                        className="w-full mb-4"
                        value={formData.password}
                        onChange={(e) => { handleChange(e) }}
                        type="password"
                        name="password"
                    />
                </div>
                <CustomButton
                    text='Sign Up'
                    className='w-1/2 '
                    onClick={handleSubmit}
                    loader={loader}

                />
            </div>
        </>
    );
}