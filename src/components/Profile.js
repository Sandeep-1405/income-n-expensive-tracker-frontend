import React from 'react';

const Profile = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        address: "123 Main Street, Springfield, USA",
        bio: "A passionate developer who loves to explore new technologies.",
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-primary text-white">
                            <h2>Profile</h2>
                        </div>
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt="Profile"
                                    className="rounded-circle img-fluid"
                                    style={{ width: "150px", height: "150px" }}
                                />
                            </div>
                            <h4 className="text-center">{user.name}</h4>
                            <p className="text-center text-muted">{user.bio}</p>
                            <hr />
                            <div className="px-3">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Address:</strong> {user.address}</p>
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-primary mx-2">Edit Profile</button>
                            <button className="btn btn-danger mx-2">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
