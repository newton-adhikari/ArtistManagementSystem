const Home = () => {
    return (
        <div className="mt-5 container container-fluid">
            <h3 className="display-5 text-center border-bottom border-warning">Welcome to Artist Management System</h3>
            <div className="p-3 d-flex justify-content-around">
                <div className="p-3 border shadow-sm">
                    <p>Users</p>
                    <hr />
                    <p>Total: </p>
                </div>
                <div className="p-3 border shadow-sm">
                    <p>Artist</p>
                    <hr />
                    <p>Total: </p>
                </div>
                <div className="p-3 border shadow-sm">
                    <p>Music</p>
                    <hr />
                    <p>Total: </p>
                </div>
            </div>
        </div>
    )
}

export default Home;