const Home = () => {
    return (
        <div>
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