import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router';



const SignUp = () => {
    const [success, setsuccess] = useState(false)
    const [errorMassgae, setErrorMassage] = useState('')
    const [show, setShow] = useState(false)

    const handleSignup = (e) => {
        e.preventDefault()
        const name=e.target.name.value;
        const photo=e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms=e.target.terms.checked;
        console.log(email, password,terms)
        setsuccess(false)
        setErrorMassage('')
        if(!terms){
            setErrorMassage('Please accept our terms and condition')
            return
        }

        //  password Validation
        const passwordregEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z].{6,})/
        if (passwordregEx.test(password) === false) {
            setErrorMassage('Password must have One digit , One uppercase,One lowercase and 6 charectors or longer')
            return
        }
//          create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                // email verify
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    setsuccess(true)
                    alert('We send you a verification email.please chack your email')
                })
                // update user profile
                const profile={
                    displayName : name,
                    photoURL : photo
                }
                updateProfile(auth.currentUser,profile)
                .then(()=>{
                    console.log('profile update')
                })
                .catch(error=>{
                    console.log(error)
                })
            })
            .catch(error => {
                console.log(error)
                setErrorMassage(error.message)
            })
    }

    return (
        <div>
            <div className="card  w-full mx-auto mt-5 bg-sky-50 max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Signup Now</h1>
                    <form onSubmit={handleSignup} className="fieldset">
                        <label className="label">Name</label>
                        <input type="text" name='name' className="input" placeholder="Name" />
                        <label className="label">Photo URL</label>
                        <input type="text" name='photo' className="input" placeholder="Photo URL" />
                        <label className="label">Email</label>
                        <input type="email" name='email' className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input type={show ? 'text' : 'password'} name='password' className="input" placeholder="Password" />
                            <button onClick={() => setShow(!show)} className='absolute top-3.5 right-8'>
                                {
                                    show ? <FaEyeSlash size={15} />
                                        : <FaEye size={15} />
                                }
                            </button>
                        </div>
                        <label className="label">
                            <input type="checkbox" defaultChecked className="checkbox"  name='terms'/>
                           Accept terms and condition
                        </label>
                        <button className="btn btn-neutral mt-4">SignUp</button>
                    </form>
                    <p>Already have an account ? please <Link className='text-green-400 underline' to='/Login'>LogIn</Link></p>
                    {
                        errorMassgae && <p className='text-red-600'>{errorMassgae}</p>
                    }
                    {
                        success && <p className='text-green-700'>Usre has create Successfully</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default SignUp;