import React, { useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { socket } from '../Services/socket';

const CardForm = () => {

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const cardData = async (data) => {

        const cardDetails = {
            title: data.InputTitle,
            description: data.InputDescription
        };
        
        socket.emit('user-message',cardDetails)
        
        setValue("InputTitle", '');
        setValue("InputDescription", '');
    }

    useEffect(() => {
        setValue("InputTitle", '');
        setValue("InputDescription", '');
    }, [setValue]);
     // Set up socket listener on component mount
     useEffect(() => {
        socket.on('message-server', (message) => {
            const { title, description } = message;
            alert(`Message received: ${title} and ${description}`);
        });

        // Cleanup listener when component unmounts
        return () => {
            socket.off('message-server');
        };
    }, []); // Empty dependency array to ensure the effect runs only once on mount


    return (
        <div className='container mt-4 d-flex flex-column' style={{position:'relative', display:'flex',justifyContent:'center' , alignItems:'center',height:'100vh'}}>
            <div className={`row justify-content-center container-fluid`} id='form-data'>
                <div className='col-md-8 col-lg-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3 className='card-title text-center'>Add Card Details</h3>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit(cardData)}>
                                <div className="mb-3">
                                    <label htmlFor="InputTitle" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        id="InputTitle"
                                        {...register("InputTitle", { required: true })}
                                        className={`form-control ${errors.InputTitle ? 'is-invalid' : ''}`}
                                    />
                                    {errors.InputTitle && (
                                        <div className='invalid-feedback'>Title is required</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="InputDescription" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        id="InputDescription"
                                        {...register("InputDescription", { required: true })}
                                        className={`form-control ${errors.InputDescription ? 'is-invalid' : ''}`}
                                    />
                                    {errors.InputDescription && (
                                        <div className='invalid-feedback'>Description is required</div>
                                    )}
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-50"
                                    >
                                        Submit
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardForm;
